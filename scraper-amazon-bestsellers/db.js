const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

// Criando o cliente DynamoDB e o cliente de documentos
const client = new DynamoDBClient({ region: 'us-east-1' });
const dynamodb = DynamoDBDocumentClient.from(client);

// Função para salvar um produto no DynamoDB
async function saveProduct(product) {
  const params = {
    TableName: 'ProductsTable', // Nome da tabela do DynamoDB
    Item: {
      ProductID: product.ProductID,  // ID do produto
      Title: product.Title,          // Título do produto
      Price: product.Price,          // Preço do produto
      Link: product.Link,            // Link para o produto
      Category: product.Category,    // Categoria do produto
    },
  };

  try {
    const putCommand = new PutCommand(params);  // Criando o comando de PUT para DynamoDB
    const result = await dynamodb.send(putCommand);  // Envia o comando
    console.log('Produto salvo no DynamoDB:', result); // Sucesso ao salvar
  } catch (error) {
    console.error('Erro ao salvar o produto no DynamoDB:', error); // Erro ao salvar
  }
}

// Função para buscar produtos com quantidade variável
const getProducts = async (quantity) => {
  const params = {
    TableName: 'ProductsTable',  // Nome da tabela do DynamoDB
    Limit: quantity,             // Limita a quantidade de produtos retornados
  };

  try {
    const { Items } = await dynamodb.send(new ScanCommand(params)); // Executa o comando de Scan
    return Items;  // Retorna os itens encontrados
  } catch (error) {
    console.error('Erro ao buscar os produtos no DynamoDB:', error); // Erro na consulta
    throw new Error('Erro ao buscar produtos');  // Lança erro caso a consulta falhe
  }
};

module.exports = { saveProduct, getProducts };
