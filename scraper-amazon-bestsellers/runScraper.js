const { scrapeAmazon } = require('./scraper');

(async () => {
    console.log('🚀 Rodando o scraper para popular o banco...');
    await scrapeAmazon();
    console.log('✅ Banco populado com novos produtos!');
})();
