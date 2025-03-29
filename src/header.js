const puppeteer = require('puppeteer');
const express = require('express');

async function scrapeBestSellers() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded' });

  const products = await page.evaluate(() => {
    const productList = [];

    const productElements = document.querySelectorAll('.a-carousel-card');
    productElements.forEach(product => {
      const title = product.querySelector('.p13n-sc-truncate-desktop-type2')?.innerText.trim() || 'Título não encontrado';
      const price = product.querySelector('._cDEzb_p13n-sc-price_3mJ9Z')?.innerText.trim() || 'Preço não encontrado';
      const link = product.querySelector('a.a-link-normal')?.href || '#';

      if (title && price) { //se titulo e preco forem encontrados
        productList.push({ title, price, link }); //o prodtoduto e adicionado a lista productList
      }
    });

    return productList;
  });

  await browser.close();
  return products;
}

module.exports = scrapeBestSellers;
