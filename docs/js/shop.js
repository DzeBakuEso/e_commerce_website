document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.getElementById('shop-products');

  fetch('assets/data.json')
    .then(response => response.json())
    .then(products => {
      shopContainer.innerHTML = products.map((product, index) => `
        <div class="product">
          <h3>${product.name}</h3>
          <p>${product.description || ''}</p>
          <p>$${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${index})">Add to Cart</button>
        </div>
      `).join('');
    });

  window.addToCart = function (productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(p => p.id === productId);

    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };
});
