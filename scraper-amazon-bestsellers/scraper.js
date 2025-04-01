// const puppeteer = require("puppeteer-core");
// const chromium = require("@sparticuz/chromium");

// const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
// const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

// const client = new DynamoDBClient({ region: 'us-east-1' });
// const ddb = DynamoDBDocumentClient.from(client);

// async function scraper(productsLimit = 3) {
//   let browser;
//   try {
//     // Inicia o navegador com o Chromium configurado
//     browser = await puppeteer.launch({
//       args: chromium.args,
//       defaultViewport: chromium.defaultViewport,
//       executablePath: await chromium.executablePath(),
//       headless: true,
//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.amazon.com.br/gp/bestsellers');

//     // Extrai os produtos com base nos elementos da página
//     const products = await page.evaluate((limit) => {
//       const items = Array.from(document.querySelectorAll('.a-carousel-card'));

//       return items.slice(0, limit).map(product => ({
//         title: product.querySelector('.p13n-sc-truncate-desktop-type2')?.innerText.trim() || 'Título não encontrado',
//         price: product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim() || 'Preço não encontrado',
//         link: product.querySelector('a.a-link-normal')?.href || '#'
//       }));
//     }, productsLimit);

//     // Log do que foi extraído
//     console.log("Produtos extraídos:", products);

//     // Salva os produtos no DynamoDB
//     await Promise.all(products.map(async (product) => {
//       const command = new PutCommand({
//         TableName: 'Products',  // Nome da tabela DynamoDB
//         Item: {
//           title: product.title,
//           price: product.price,
//           link: product.link,
//           date: (new Date()).toLocaleDateString('pt-BR'),
//         }
//       });

//       const res = await ddb.send(command);
//       console.log('Produto cadastrado:', JSON.stringify(product));
//     }));

//   } catch (error) {
//     console.error('Erro no scraper:', error);
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }

// // Função para retornar produtos salvos no DynamoDB via API
// async function api(event) {
//   const productsLimit = event.queryStringParameters?.products || 3; // Obtém o número de produtos via query string
//   const command = new ScanCommand({
//     TableName: "Products"
//   });

//   const res = await client.send(command);

//   return {
//     statusCode: 200,
//     body: JSON.stringify(res.Items.slice(0, productsLimit)) // Limita o número de produtos retornados conforme query
//   };
// }

// module.exports = {
//   scraper,
//   api
// };





// scraper.js - Usando SDK v3
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const puppeteer = require('puppeteer');

// Cria o cliente DynamoDB
const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamodb = DynamoDBDocumentClient.from(client);

async function scrapeAmazon() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com.br/gp/bestsellers');

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.a-carousel-card'));
    return items.map(product => ({
      title: product.querySelector('.p13n-sc-truncate-desktop-type2')?.innerText.trim() || 'Título não encontrado',
      price: product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim() || 'Preço não encontrado',
      link: product.querySelector('a.a-link-normal')?.href || '#'
    }));
  });

  console.log(products); // Exibe os produtos no console

  await browser.close();

  // Salva os produtos no DynamoDB
  for (let product of products) {
    const params = {
      TableName: 'ProductsTable',
      Item: {
        ProductID: product.link, // Usando o link como ID único
        Title: product.title,
        Price: product.price,
        Link: product.link,
      },
    };

    try {
      await dynamodb.send(new PutCommand(params)); // Usando PutCommand para o SDK v3
      console.log('Produto salvo com sucesso:', product);
    } catch (error) {
      console.error('Erro ao salvar o produto:', error);
    }
  }

  return products; // Retorna os dados dos produtos
}

module.exports.scrape = scrapeAmazon;
