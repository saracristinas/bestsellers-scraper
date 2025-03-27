const express = require('express');
const path = require('path');
const scrapeBestSellers = require('./src/header'); // Caminho correto para o header.js

const app = express();
const port = 3000;

// Servindo arquivos estáticos (HTML, CSS, JS) da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para retornar os produtos coletados
app.get('/api/products', async (req, res) => {
    try {
        const products = await scrapeBestSellers();
        res.json(products);  // Envia os dados dos produtos como resposta JSON
    } catch (error) {
        res.status(500).send('Erro ao coletar os produtos');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
