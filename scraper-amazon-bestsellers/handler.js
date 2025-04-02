const { scrapeAmazon } = require('./scraper'); // Chama a função scrapeAmazon do scraper.js
const { getProducts } = require('./db');  // Função para buscar os produtos no DynamoDB

async function getProductsHandler(event) {
  const quantity = event.queryStringParameters && event.queryStringParameters.quantity
    ? Math.max(1, parseInt(event.queryStringParameters.quantity))  // Garante que a quantidade será pelo menos 1
    : 3; // Limita a 3 produtos por padrão

  try {
    let products = await getProducts(quantity);

    // Caso não haja produtos no DynamoDB, executa o scraper
    if (products.length === 0) {
      console.log('Nenhum produto encontrado no DynamoDB, executando o scraper...');
      await scrapeAmazon();  // Executa o scraper para preencher o DynamoDB
      products = await getProducts(quantity);  // Busca novamente após a execução do scraper
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Produtos recuperados com sucesso',
        data: products,
      }),
    };
  } catch (error) {
    console.error('Erro ao recuperar produtos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erro ao recuperar produtos',
        error: error.message,
      }),
    };
  }
}

// 🔹 Corrigindo a exportação da função
module.exports.getProductsHandler = getProductsHandler;
