// cart.js

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Expose addToCart for main.js to call
window.handleAddToCart = function (product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart();
  renderCart();
};

// Remove product from cart by ID
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

// Update product quantity
function updateQuantity(productId, newQuantity) {
  const product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity = newQuantity;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      renderCart();
    }
  }
}

// Calculate totals: product total, VAT (20%), shipping flat $50, grand total
function calculateTotals() {
  const productTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 50 : 0;
  const vat = productTotal * 0.2;
  const grandTotal = productTotal + shipping + vat;
  return { productTotal, shipping, vat, grandTotal };
}

// Render cart items in the DOM with quantity controls and remove buttons
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("total").textContent = "$0.00";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)}</p>
      <div>
        <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  const totals = calculateTotals();
  document.getElementById(
    "total"
  ).textContent = `$${totals.grandTotal.toFixed(2)}`;

  // Add event listeners to quantity buttons and remove buttons
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const product = cart.find((p) => p.id === productId);
      if (!product) return;

      if (action === "increase") {
        updateQuantity(productId, product.quantity + 1);
      } else if (action === "decrease") {
        updateQuantity(productId, product.quantity - 1);
      }
    });
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.dataset.id);
      removeFromCart(productId);
    });
  });
}

// Render cart immediately on load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
