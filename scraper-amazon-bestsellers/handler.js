// Aqui e onde eu vou definir as funcoes Lambda que serao invocadas pela API Gateway.
 // Aqui, eu vou usar o scraper que defini no scraper.js, invocar o scraping, salvar os dados no DynamoDB e retornar uma resposta para o usuário da API.
 const { scrape } = require('./scraper');  // Importa a função de scraping
 const { getProducts } = require('./db');  // Importa a função para buscar no DynamoDB
 
 module.exports.scrape = async (event) => {
   try {
     // Número de produtos a serem retornados, com default para 3
     const quantity = event.queryStringParameters?.quantity || 3;
 
     // Chama o scraper para extrair os produtos
     const scrapedProducts = await scrape();  // Chama o scraper aqui
     
     // Salva os produtos no DynamoDB (se necessário)
     for (let product of scrapedProducts) {
       await saveProduct(product);  // Salva cada produto no banco
     }
 
     // Chama a função para pegar os produtos do DynamoDB
     const products = await getProducts(quantity);  // Passa a quantidade para pegar mais ou menos produtos
 
     return {
       statusCode: 200,
       body: JSON.stringify({
         message: 'Produtos extraídos e salvos com sucesso!',
         products: products,  // Retorna os produtos encontrados
       }),
     };
   } catch (error) {
     return {
       statusCode: 500,
       body: JSON.stringify({
         message: 'Erro ao extrair os produtos',
         error: error.message,
       }),
     };
   }
 };
 
