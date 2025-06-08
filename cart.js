// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  const existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item.id === productId);
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

function calculateTotals() {
  const productTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 50 : 0;
  const vat = productTotal * 0.2;
  const grandTotal = productTotal + shipping + vat;
  return { productTotal, shipping, vat, grandTotal };
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('cart-item');

      div.innerHTML = `
        <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
        <label>
          Quantity: 
          <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="qty-input" />
        </label>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      `;

      cartContainer.appendChild(div);
    });
  }

  const totals = calculateTotals();

  document.getElementById('subtotal').textContent = totals.productTotal.toFixed(2);
  document.getElementById('shipping').textContent = totals.shipping.toFixed(2);
  document.getElementById('vat').textContent = totals.vat.toFixed(2);
  document.getElementById('total').textContent = totals.grandTotal.toFixed(2);

  // Add event listeners for quantity inputs
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const newQty = parseInt(e.target.value);
      const id = parseInt(e.target.getAttribute('data-id'));
      if (newQty > 0) updateQuantity(id, newQty);
    });
  });

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      removeFromCart(id);
    });
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
