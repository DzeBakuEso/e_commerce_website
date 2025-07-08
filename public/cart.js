let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

async function addToCart(product) {
  const existingProduct = cart.find(item => item._id === product._id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart();
  renderCart();

  // Sync with backend
  try {
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product._id,
        quantity: product.quantity,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to sync cart item to backend');
    }
  } catch (err) {
    console.error('Add to cart backend error:', err.message);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item._id !== productId);
  saveCart();
  renderCart();
}

function updateQuantity(productId, newQuantity) {
  const product = cart.find(item => item._id === productId);
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
        <div class="cart-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div class="cart-details">
          <p><strong>${item.name}</strong></p>
          <p>Price: $${item.price.toFixed(2)}</p>
          <label>
            Quantity:
            <input type="number" min="1" value="${item.quantity}" data-id="${item._id}" class="qty-input" />
          </label>
          <button class="remove-btn" data-id="${item._id}">Remove</button>
        </div>
      `;

      cartContainer.appendChild(div);
    });
  }

  const totals = calculateTotals();
  document.getElementById('subtotal').textContent = totals.productTotal.toFixed(2);
  document.getElementById('shipping').textContent = totals.shipping.toFixed(2);
  document.getElementById('vat').textContent = totals.vat.toFixed(2);
  document.getElementById('total').textContent = totals.grandTotal.toFixed(2);

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const newQty = parseInt(e.target.value);
      const id = e.target.getAttribute('data-id');
      if (newQty > 0) updateQuantity(id, newQty);
    });
  });

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});
