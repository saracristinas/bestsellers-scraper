const express = require('express');
const path = require('path');
const productRoutes = require('./routes/products.routes');

const app = express();
const port = 3000;

app.use('/api', productRoutes)

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})