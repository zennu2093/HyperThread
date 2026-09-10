// ==========================================
// 1. PRODUCTS DATA (JSON / Array)
// ==========================================
// Yahan aapke store ke items add honge.
// TODO FOR USER: Aap yahan mazeed products add kar sakte hain.
const products = [
    {
        id: 1,
        name: "HyperThread Premium Hoodie",
        price: 49.99,
        image: "https://via.placeholder.com/200" // Replace with your image link in 'images/' folder
    },
    {
        id: 2,
        name: "Graphic T-Shirt",
        price: 24.99,
        image: "https://via.placeholder.com/200"
    },
    {
        id: 3,
        name: "Streetwear Cap",
        price: 15.00,
        image: "https://via.placeholder.com/200"
    }
];

// Shopping cart store karne ke liye empty array
let cart = [];

// ==========================================
// 2. RENDER PRODUCTS TO PAGE
// ==========================================
// Yeh function products array se items nikaal kar HTML page pe dikhayega.
function displayProducts() {
    const productContainer = document.getElementById("product-list");
    productContainer.innerHTML = ""; // Clear existing contents

    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });
}

// ==========================================
// 3. ADD TO CART FUNCTIONALITY
// ==========================================
// Yeh function tab chalta hai jab user 'Add to Cart' button click karta hai.
function addToCart(productId) {
    const selectedProduct = products.find(prod => prod.id === productId);
    cart.push(selectedProduct);
    
    // Update cart items display & count
    updateCartUI();
}

// ==========================================
// 4. UPDATE CART UI & CALCULATE TOTAL
// ==========================================
function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");

    // Header mein cart count update karna
    cartCount.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerText = "0.00";
        return;
    }

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" style="color:red;">Remove</button>
            </div>
        `;
    });

    totalPriceElement.innerText = total.toFixed(2);
}

// ==========================================
// 5. REMOVE ITEM FROM CART
// ==========================================
function removeFromCart(index) {
    cart.splice(index, 1); // Specific index waala item remove karna
    updateCartUI();
}

// ==========================================
// 6. CHECKOUT FUNCTIONALITY (TODO FOR USER)
// ==========================================
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your order from HyperThreadMy!");

    /* 
    ===================================================================
    TODO FOR USER: WRITE YOUR OWN CODE HERE
    ===================================================================
    Aap yahan future mein yeh cheezein integrate kar sakte hain:
    
    1. Stripe ya PayPal Payment Gateway Code:
       - User se card info lene aur payment process karne ke liye.
       
    2. Backend API Request:
       - Fetch request bhej kar order ko Node.js/PHP backend DB mein save karna.
       - Example:
         fetch('/api/checkout', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ cartItems: cart })
         });

    3. Form Validation / Customer Address Collection:
       - Checkout hone se pehle user ka address, name, aur phone number mangna.
    ===================================================================
    */

    // Cart clear karna after checkout
    cart = [];
    updateCartUI();
}

// Page load hone par products automatically display honge
displayProducts();