// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  clearCart
} = require('../controllers/cartController');

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/clear', clearCart);

module.exports = router;
