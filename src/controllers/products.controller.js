const  scrapeBestSellers  = require('../services/best-sellers.service');

async function getBestSellers(req, res) {
    try {
        const products = await scrapeBestSellers();
        res.json(products);
    } catch (error) {
        console.error("Erro ao coletar os produtos:", error);
        res.status(500).json({ error: "Erro ao coletar os produtos" });
    }
}

module.exports = { getBestSellers };