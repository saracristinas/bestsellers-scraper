const express = require('express');
const { getBestSellers } = require('../controllers/products.controller');

const router = express.Router();

router.get('/products', getBestSellers);

module.exports = router;