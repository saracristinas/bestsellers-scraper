const puppeteer = require('puppeteer');

async function scrapeBestSellers() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded' });

  const products = await page.evaluate(() => {
    const productList = [];
    const productElements = document.querySelectorAll('.zg-item-immersion');

    productElements.forEach(product => {
      const title = product.querySelector('.p13n-sc-truncated')?.textContent.trim();
      const price = product.querySelector('.p-price')?.textContent.trim();
      const link = product.querySelector('.a-link-normal')?.href;
      if (title && price) {
        productList.push({ title, price, link });
      }
    });

    return productList;
  }); 

  await browser.close();
  return products;
}

module.exports = scrapeBestSellers;
