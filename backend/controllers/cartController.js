// backend/controllers/cartController.js
const Cart = require('../models/Cart');

// Get all cart items
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart items' });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity required' });
  }

  try {
    const newCartItem = new Cart({ productId, quantity });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany();
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
};

module.exports = {
  getCart,
  addToCart,
  clearCart
};
