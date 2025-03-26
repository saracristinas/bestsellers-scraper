const puppeteer = require('puppeteer');

async function scrapeAmazon() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Substitua o URL pela página desejada
  await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded' });

  // Usar o seletor correto para os produtos
  const products = await page.$$eval('.a-carousel-card', items => {
    return items.map(item => {
      const name = item.querySelector('.p13n-sc-truncate-desktop-type2') ? item.querySelector('.p13n-sc-truncate-desktop-type2').innerText : null;
      const price = item.querySelector('.a-price') ? item.querySelector('.a-price .a-offscreen').innerText : null;
      const image = item.querySelector('.p13n-sc-product-image') ? item.querySelector('.p13n-sc-product-image').src : null;
      const link = item.querySelector('a.a-link-normal') ? item.querySelector('a.a-link-normal').href : null;

      return { name, price, image, link };
    });
  });

  console.log(products);

  await browser.close();
}

scrapeAmazon();
