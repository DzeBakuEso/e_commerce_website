const API_BASE = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('checkout-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerName = document.getElementById('customer-name').value.trim();
    const shippingAddress = document.getElementById('shipping-address').value.trim();

    if (!customerName || !shippingAddress) {
      alert('Please fill in all fields.');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Transform localStorage cart to expected backend format
    const cartItems = cart.map(item => ({
      productId: item.id,
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

      // Success
      alert('Order placed successfully!');
      localStorage.removeItem('cart'); // Clear cart
      window.location.href = 'thankyou.html';

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed: ' + error.message);
    }
  });
});
