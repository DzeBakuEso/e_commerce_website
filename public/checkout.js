const API_BASE = 'https://e-commerce-website-up4q.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = document.getElementById('name').value.trim();
    const shippingAddress = document.getElementById('address').value.trim();

    if (!customerName || !shippingAddress) {
      alert('Please fill in all required fields.');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const cartItems = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }));

    try {
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          shippingAddress,
          cartItems
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to place order');
      }

      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed: ' + error.message);
    }
  });
});
