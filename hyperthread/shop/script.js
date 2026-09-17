// ==========================================
// 1. ALL PRODUCTS DATA (WITH CATEGORIES)
// ==========================================
const products = [
    {
        id: 1,
        name: "Automatic Washing Machine",
        price: 299.99,
        oldPrice: 400.00,
        discount: "-25%",
        category: "washing-machine",
        image: "images/wm1.jpg"
    },
    {
        id: 2,
        name: "Double Door Refrigerator",
        price: 499.99,
        oldPrice: 650.00,
        discount: "-23%",
        category: "fridge",
        image: "images/fridge1.jpg"
    },
    {
        id: 3,
        name: "Inverter Air Conditioner",
        price: 399.99,
        oldPrice: 500.00,
        discount: "-20%",
        category: "aircon",
        image: "images/ac1.jpg"
    },
    {
        id: 4,
        name: "Automatic Washing Machine",
        price: 299.99,
        oldPrice: 400.00,
        discount: "-25%",
        category: "washing-machine",
        image: "images/wm2.jpg"
    },
    {
        id: 5,
        name: "Double Door Refrigerator",
        price: 499.99,
        oldPrice: 650.00,
        discount: "-23%",
        category: "fridge",
        image: "images/fridge2.jpg"
    },
    {
        id: 6,
        name: "Inverter Air Conditioner",
        price: 399.99,
        oldPrice: 500.00,
        discount: "-20%",
        category: "aircon",
        image: "images/ac2.jpg"
    },
    {
        id: 7,
        name: "Automatic Washing Machine",
        price: 299.99,
        oldPrice: 400.00,
        discount: "-25%",
        category: "washing-machine",
        image: "images/wm3.jpg"
    },
    {
        id: 8,
        name: "Double Door Refrigerator",
        price: 499.99,
        oldPrice: 650.00,
        discount: "-23%",
        category: "fridge",
        image: "images/fridge3.jpg"
    },
      {
        id: 9,
        name: "Inverter Air Conditioner",
        price: 399.99,
        oldPrice: 500.00,
        discount: "-20%",
        category: "aircon",
        image: "images/ac3.jpg"
    }
];

// LocalStorage se saved cart load karna
let cart = JSON.parse(localStorage.getItem('hyperthread_cart')) || [];

// ==========================================
// 2. RENDER PRODUCTS DYNAMICALLY (HOME PAGE)
// ==========================================
function renderProducts() {
    const productGrid = document.getElementById("product-list");
    if (!productGrid) return; // Agar kisi aur page par hon toh code na ruke

    productGrid.innerHTML = "";

    products.forEach(product => {
        const cardHTML = `
            <div class="product-card">
                <span class="discount-tag">${product.discount}</span>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-title">${product.name}</div>
                <div class="price-box">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                </div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">ADD TO BAG</button>
            </div>
        `;
        productGrid.innerHTML += cardHTML;
    });
}

// ==========================================
// 3. RENDER CATEGORY SPECIFIC PAGE
// ==========================================
function renderCategoryPage() {
    const grid = document.getElementById("category-product-list");
    const titleElement = document.getElementById("category-title");
    if (!grid) return;

    // URL se category name get karna (e.g., ?type=fridge)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('type');

    if (selectedCategory && titleElement) {
        titleElement.innerText = selectedCategory.replace('-', ' ').toUpperCase();
    }

    // Selected category wale items filter karna
    const filteredProducts = products.filter(p => p.category === selectedCategory);

    grid.innerHTML = "";

    if (filteredProducts.length === 0) {
        grid.innerHTML = "<p>No products found in this category.</p>";
        return;
    }

    filteredProducts.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <span class="discount-tag">${product.discount}</span>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-title">${product.name}</div>
                <div class="price-box">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                </div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">ADD TO BAG</button>
            </div>
        `;
    });
}

// ==========================================
// 4. CART SYSTEM LOGIC
// ==========================================
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    cart.push(item);
    localStorage.setItem('hyperthread_cart', JSON.stringify(cart));
    updateCartCount(); // Ab bina alert ke silent add hota hai
}

function displayCartPageItems() {
    const cartListContainer = document.getElementById("horizontal-cart-list");
    const cartTotalElement = document.getElementById("cart-page-total");

    if (!cartListContainer) return;

    if (cart.length === 0) {
        cartListContainer.innerHTML = "<p>Your shopping bag is currently empty.</p>";
        if (cartTotalElement) cartTotalElement.innerText = "0.00";
        return;
    }

    cartListContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartListContainer.innerHTML += `
            <div class="horizontal-cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
            </div>
        `;
    });

    if (cartTotalElement) {
        cartTotalElement.innerText = total.toFixed(2);
    }
}

function removeCartItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('hyperthread_cart', JSON.stringify(cart));
    displayCartPageItems();
    updateCartCount();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping bag is empty!");
        return;
    }

    // 1. Apna Whatsapp Number Yahan Likhein (Country Code Ke Saath, e.g., 92300xxxxxxx)
    const phoneNumber = "60149319218"; // <-- Yahan Apna Number Daalein

    // 2. Order Details Format Karein
    let orderMessage = "🛍️ *NEW ORDER - HYPERTHREADMY*\n";
    orderMessage += "-----------------------------------\n\n";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        orderMessage += `${index + 1}. *${item.name}*\n   Price: $${item.price.toFixed(2)}\n\n`;
    });

    orderMessage += "-----------------------------------\n";
    orderMessage += `💰 *Total Amount:* $${total.toFixed(2)}\n\n`;
    orderMessage += "Please confirm your order and share payment details. Thank you!";

    // 3. Message ko URL Encoding Mein Convert Karein
    const encodedMessage = encodeURIComponent(orderMessage);

    // 4. WhatsApp Direct Chat Link Banayein
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 5. Cart Clear Karein Aur WhatsApp Par Redirect Karein
    cart = [];
    localStorage.setItem('hyperthread_cart', JSON.stringify(cart));
    displayCartPageItems();
    updateCartCount();

    // Nayi Tab Mein WhatsApp Open Karein
    window.open(whatsappURL, '_blank');
}

// ==========================================
// 5. IMAGE SLIDER LOGIC
// ==========================================
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active-dot"));

    if (slides[currentSlideIndex]) slides[currentSlideIndex].classList.add("active");
    if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add("active-dot");
}

function moveSlide(step) {
    showSlide(currentSlideIndex + step);
}

function currentSlide(index) {
    showSlide(index);
}

setInterval(() => {
    moveSlide(1);
}, 6000);

// ==========================================
// 6. INITIALIZE ON PAGE LOAD
// ==========================================
renderProducts();
updateCartCount();