// Aqui e onde eu vou definir as funcoes Lambda que serao invocadas pela API Gateway.
 // Aqui, eu vou usar o scraper que defini no scraper.js, invocar o scraping, salvar os dados no DynamoDB e retornar uma resposta para o usuário da API.

// handler.js
const { scrape } = require('./scraper'); // Importa a função scrape do scraper.js

module.exports.scrape = async (event) => {
  try {
    const products = await scrape(); // Chama a função scrape para pegar os dados

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Produtos extraídos com sucesso!',
        products: products,
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
