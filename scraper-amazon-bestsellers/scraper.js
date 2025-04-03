const puppeteer = require('puppeteer');
const { saveProduct } = require('./db');

async function scrapeAmazon() {
  let browser;
  
  try {
    console.log('🚀 Iniciando navegador...');

    browser = await puppeteer.launch({
      headless: true, 
    });    

    const page = await browser.newPage();
    await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded', timeout: 60000 });

    console.log("🛍️ Página carregada!");

    const products = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.a-carousel-card'));

      return items.map(product => {
        const title = product.querySelector('.p13n-sc-truncate-desktop-type2')?.innerText.trim();
        const price = product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim();
        const link = product.querySelector('a.a-link-normal')?.href;

        const idMatch = link ? link.match(/\/dp\/([A-Z0-9]{10})/) : null; 
        const categoryMatch = link ? link.match(/ref=zg_bs_c_([a-zA-Z-]+)/) : null;

        const productID = idMatch ? idMatch[1] : 'ID não encontrado';
        const category = categoryMatch ? categoryMatch[1] : 'Categoria não encontrada';

        return {
          ProductID: productID,
          Title: title || 'Título não encontrado',
          Price: price || 'Preço não encontrado',
          Link: link || 'Link não encontrado',
          Category: category
        };
      });
    });

    console.log("🛍️ Produtos extraídos:", products);

    for (let product of products) {
      try {
        await saveProduct(product);
        console.log(`✅ Produto salvo: ${product.Title}`);
      } catch (dbError) {
        console.error(`❌ Erro ao salvar o produto no DynamoDB: ${dbError}`);
      }
    }

    return products;
  } catch (error) {
    console.error('❌ Erro no scraper:', error);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { scrapeAmazon };
