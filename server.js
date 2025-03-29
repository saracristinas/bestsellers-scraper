const express = require('express');
const path = require('path');
const scrapeBestSellers = require('./src/header'); 

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', async (req, res) => {
    try {
        const products = await scrapeBestSellers();
        res.json(products); 
    } catch (error) {
        res.status(500).send('Erro ao coletar os produtos');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})