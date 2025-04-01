const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamodb = DynamoDBDocumentClient.from(client);

// Função para salvar um produto no DynamoDB
const saveProduct = async (product) => {
  const params = {
    TableName: 'ProductsTable',
    Item: product,  // O produto que queremos salvar
  };

  try {
    await dynamodb.send(new PutCommand(params));
    console.log('Produto salvo com sucesso:', product);
  } catch (error) {
    console.error('Erro ao salvar o produto no DynamoDB:', error);
    throw new Error('Erro ao salvar no DynamoDB');
  }
};

// Função para buscar produtos com quantidade variável
const getProducts = async (quantity) => {
  const params = {
    TableName: 'ProductsTable',
    Limit: quantity,  // Limitar a quantidade de produtos retornados
  };

  try {
    const { Items } = await dynamodb.send(new ScanCommand(params));
    return Items;
  } catch (error) {
    console.error('Erro ao buscar os produtos no DynamoDB:', error);
    throw new Error('Erro ao buscar produtos');
  }
};

module.exports = { saveProduct, getProducts };
