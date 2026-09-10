// Function to handle switching visual themes dynamically
function changeTemplate(themeName) {
    const previewContainer = document.getElementById('store-preview');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');

    // Remove all previous classes
    previewContainer.className = '';

    // Apply new theme class & content updates
    if (themeName === 'streetwear') {
        previewContainer.classList.add('theme-streetwear');
        heroTitle.innerText = "HYPERTHREAD STREETWEAR";
        heroSubtitle.innerText = "Next-gen apparel engineered for the urban movement.";
    } 
    else if (themeName === 'minimalist') {
        previewContainer.classList.add('theme-minimalist');
        heroTitle.innerText = "HyperThread Essentials";
        heroSubtitle.innerText = "Clean lines, quality fabrics, timeless design.";
    } 
    else if (themeName === 'luxury') {
        previewContainer.classList.add('theme-luxury');
        heroTitle.innerText = "HYPERTHREAD PRIVÉ";
        heroSubtitle.innerText = "Exquisite craftsmanship and premium luxury wear.";
    }

    /* 
    ===================================================================
    TODO FOR USER: WRITE YOUR OWN CODE HERE
    ===================================================================
    1. Custom Template Adder:
       Aap yahan naye themes ke JS conditions add kar sakte hain.

    2. Save Selected Template:
       User ki select ki hui layout preferences ko localStorage mein save karein:
       localStorage.setItem('preferredTheme', themeName);
    ===================================================================
    */
}