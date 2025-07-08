const API_BASE = 'http://localhost:5000/api';
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  const shopContainer = document.getElementById('shop-products');

  fetch(`${API_BASE}/products`)
    .then(response => response.json())
    .then(products => {
      allProducts = products;
      shopContainer.innerHTML = '';

      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Normalize image path
        const imagePath = product.image && product.image.startsWith('/')
          ? product.image
          : '/images/placeholder.jpg';

        productDiv.innerHTML = `
          <img src="${imagePath}" alt="${product.name}" class="product-img" />
          <h3>${product.name}</h3>
          <p>${product.description || ''}</p>
          <p>$${product.price.toFixed(2)}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        `;

        const btn = productDiv.querySelector('.add-to-cart-btn');
        btn.addEventListener('click', () => {
          const itemToAdd = {
            ...product,
            image: imagePath  // store normalized image path in cart
          };
          addToCart(itemToAdd);
        });

        shopContainer.appendChild(productDiv);
      });
    })
    .catch(err => {
      console.error('Failed to fetch products:', err);
      shopContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    });
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item._id === product._id || item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}
