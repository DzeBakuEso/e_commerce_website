// backend/routes/products.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById
} = require('../controllers/productController');

// GET /api/products - fetch all products
router.get('/', getAllProducts);

// GET /api/products/:id - fetch product by ID
router.get('/:id', getProductById);

module.exports = router;
