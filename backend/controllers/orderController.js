// backend/controllers/orderController.js
const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { cartItems, customerName, shippingAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * (item.price || 0);
    }, 0);

    const newOrder = new Order({
      cartItems,
      totalPrice,
      customerName,
      shippingAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation error:', error.message);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// Optional: Fetch all orders (admin use)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};
