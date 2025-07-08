// backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const products = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality sound with noise cancellation.',
    image: '/images/headphones.jpg',
    countInStock: 10,
  },
  {
    name: 'Smart Watch',
    price: 149.99,
    description: 'Track fitness, monitor sleep, and receive notifications.',
    image: '/images/watch.jpg',
    countInStock: 5,
  },
  {
    name: 'Mechanical Keyboard',
    price: 89.99,
    description: 'RGB backlight and tactile switches for better typing.',
    image: '/images/keyboard.jpg',
    countInStock: 8,
  }
];

const importData = async () => {
  try {
    await Product.deleteMany(); // clear all products
    await Product.insertMany(products); // insert fresh ones
    console.log('✅ Sample product data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting data:', err.message);
    process.exit(1);
  }
};

importData();
