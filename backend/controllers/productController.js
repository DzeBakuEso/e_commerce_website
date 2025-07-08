// backend/controllers/productController.js
const Product = require('../models/Product');
const mongoose = require('mongoose');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    console.log("📦 Attempting to fetch all products...");
    const products = await Product.find();
    console.log(`✅ Retrieved ${products.length} product(s)`);
    res.json(products);
  } catch (err) {
    console.error("❌ Error in getAllProducts:", err.message);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error(`❌ Invalid product ID: ${id}`);
    return res.status(400).json({ message: 'Invalid product ID format' });
  }

  try {
    console.log(`🔍 Attempting to fetch product with ID: ${id}`);
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error("❌ Error in getProductById:", err.message);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
