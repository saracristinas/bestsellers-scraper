// scraper.js
const puppeteer = require('puppeteer');
const { saveProduct } = require('./db'); // Função para salvar no DynamoDB

// Função para extrair produtos da Amazon
async function scrapeAmazon() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded' });

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.a-carousel-card'));
    return items.map(product => {
      const title = product.querySelector('.p13n-sc-truncate-desktop-type2')?.innerText.trim();
      const price = product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim();
      const link = product.querySelector('a.a-link-normal')?.href;
      const idMatch = link.match(/\/dp\/([A-Z0-9]{10})/); // Expressão regular para pegar o ID real
      const categoryMatch = link.match(/ref=zg_bs_c_([a-zA-Z-]+)/); // Captura a categoria no ref

      // Extrair o ID real do produto a partir do link
      const productID = idMatch ? idMatch[1] : 'ID não encontrado';
      const category = categoryMatch ? categoryMatch[1] : 'Categoria não encontrada';

      console.log({
        ProductID: productID,
        Category: category
      });
      
      return {
        ProductID: productID,
        Title: title || 'Título não encontrado',
        Price: price || 'Preço não encontrado',
        Link: link || 'Link não encontrado',
        Category: category  // Agora inclui a categoria
      };
    });
  });

  await browser.close();

  // Salva os produtos no DynamoDB
  for (let product of products) {
    await saveProduct(product); // Chama a função para salvar o produto no DynamoDB
  }

  return products; // Retorna os dados dos produtos
}

module.exports.scrape = scrapeAmazon;
