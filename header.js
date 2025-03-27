const puppeteer = require('puppeteer'); //Importa a biblioteca Puppeteer para fazer o scraping

// Função assíncrona para rodar o scraper
async function scrapeAmazon() {
  const browser = await puppeteer.launch(); // Abre o navegador
  const page = await browser.newPage(); // Cria uma nova aba no navegador

  // Aqui eu estou acessando a página de mais vendidos da Amazon Brasil
  // Eu uso o 'waitUntil: "domcontentloaded"' para garantir que o conteúdo da página tenha carregado antes de continuar
  await page.goto('https://www.amazon.com.br/gp/bestsellers', { waitUntil: 'domcontentloaded' });

  // Eu coloquei um 'waitForSelector' para esperar a primeira parte dos produtos carregar na página
  // Isso é útil para garantir que os elementos que estamos buscando existam na página
  await page.waitForSelector('.a-carousel-card', { timeout: 5000 }); 

   // Agora, eu vou buscar os dados dos produtos. Vou usar o '$$eval' para pegar todos os elementos com a classe '.a-carousel-card'
  // Essa classe representa cada item na lista de mais vendidos
  const products = await page.$$eval('.a-carousel-card', items => {
    // Para cada item encontrado, eu vou mapear e pegar as informações que preciso (nome, preço e link)
    return items.map(item => {
        // A primeira coisa que eu busco é o nome do produto
      // Caso a classe não seja encontrada, eu deixo o valor como null
      const name = item.querySelector('.p13n-sc-truncate-desktop-type2') ? item.querySelector('.p13n-sc-truncate-desktop-type2').innerText : null;

      const price = item.querySelector('span._cDEzb_p13n-sc-price_3mJ9Z') ? item.querySelector('span._cDEzb_p13n-sc-price_3mJ9Z').innerText : null;

      const link = item.querySelector('a.a-link-normal') ? item.querySelector('a.a-link-normal').href : null;

      return { name, price, link };
    });
  });

  console.log(products); // Aqui eu só exibo os dados capturados no console para poder ver os resultados

  await browser.close(); // Depois de fazer tudo, eu fecho o navegador
}

scrapeAmazon(); // Chama a função para rodar o scraper
