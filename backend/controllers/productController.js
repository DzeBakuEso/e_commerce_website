// backend/controllers/productController.js
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    console.log('📦 Attempting to fetch all products...');
    const products = await Product.find();

    console.log(`✅ Retrieved ${products.length} product(s)`);
    res.status(200).json(products);
  } catch (err) {
    console.error('❌ Error in getAllProducts:', err.message);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(`🔍 Attempting to fetch product with ID: ${productId}`);

    const product = await Product.findById(productId);

    if (!product) {
      console.warn(`⚠️ Product not found with ID: ${productId}`);
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('✅ Product found:', product.name);
    res.status(200).json(product);
  } catch (err) {
    console.error('❌ Error in getProductById:', err.message);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
