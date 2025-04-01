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
