const { getProducts } = require('./db'); 

async function getProductsHandler(event) {
  const quantity = event.queryStringParameters && event.queryStringParameters.quantity
    ? Math.max(1, parseInt(event.queryStringParameters.quantity))  
    : 3; 

  try {
    let products = await getProducts(quantity);

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

module.exports.getProductsHandler = getProductsHandler; 
