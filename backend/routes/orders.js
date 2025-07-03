// backend/routes/orders.js
const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders
} = require('../controllers/orderController');

// POST /api/orders - place a new order
router.post('/', createOrder);

// GET /api/orders - get all orders (optional - for admin/debug)
router.get('/', getAllOrders);

module.exports = router;
