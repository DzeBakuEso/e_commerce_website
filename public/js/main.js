const API_BASE = 'https://e-commerce-website-up4q.onrender.com/api';

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_BASE}/products`)
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products);
      attachCartListeners(products);
    })
    .catch((error) => {
      console.error("Error loading products from API:", error);
    });
});

/**
 * Render product cards dynamically into the DOM.
 */
function renderProducts(products) {
  const productList = document.getElementById("product-list");

  if (!productList) return;

  productList.innerHTML = ""; // Clear container

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product._id}">Add to Cart</button>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

/**
 * Attach click event listeners to "Add to Cart" buttons.
 */
function attachCartListeners(products) {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      const product = products.find((p) => p._id === productId);

      if (product) {
        addToCart(product);
      }
    });
  });
}

/**
 * Add product to cart using the global handler (cart.js).
 */
function addToCart(product) {
  if (typeof window.handleAddToCart === "function") {
    window.handleAddToCart(product);
  } else {
    console.warn("Cart handler not found. Make sure cart.js is loaded.");
  }
}
