// js/script.js

// Sample product data (in real project, fetch this or load from data.json)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 150,
    image: "images/headphones.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 300,
    image: "images/watch.jpg"
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    price: 120,
    image: "images/keyboard.jpg"
  }
];

let cart = [];

// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const itemInCart = cart.find(item => item.id === productId);

  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  console.log("Cart:", cart); // For now, show in console
  updateCartUI(); // This will be defined in the next steps
}

// Hook into DOM buttons (you'll connect these to actual buttons in HTML later)
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      addToCart(productId);
    });
  });
});
