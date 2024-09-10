// Initialize an empty cart object
let cart = {};

// Add event listeners to all fruit buttons
const fruitButtons = document.querySelectorAll('.fruit-button');
fruitButtons.forEach(button => {
    button.addEventListener('click', function() {
        const fruit = button.getAttribute('data-fruit');
        addToCart(fruit);
        updateCartDisplay();
    });
});

// Function to add fruit to the cart
function addToCart(fruit) {
    if (!cart[fruit]) {
        cart[fruit] = 1; // If the fruit is not in the cart, add it with quantity 1
    } else {
        cart[fruit]++; // If the fruit is already in the cart, increase the quantity
    }
}

// Function to remove fruit from the cart
function removeFromCart(fruit) {
    if (cart[fruit] && cart[fruit] > 1) {
        cart[fruit]--; // Decrease the quantity
    } else {
        delete cart[fruit]; // Remove the fruit from the cart if quantity is 1
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Clear the current list

    for (const fruit in cart) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${fruit} (x${cart[fruit]})
            <button class="bg-green-400 px-2 py-1 ml-2" onclick="addToCart('${fruit}'); updateCartDisplay()">+</button>
            <button class="bg-red-400 px-2 py-1 ml-2" onclick="removeFromCart('${fruit}'); updateCartDisplay()">-</button>
        `;
        cartItems.appendChild(li);
    }

    // Update the code block to reflect the current cart state
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript for managing the cart and updating the UI
let cart = ${JSON.stringify(cart, null, 2)};

// Function to add fruit to the cart
function addToCart(fruit) {
    if (!cart[fruit]) {
        cart[fruit] = 1;
    } else {
        cart[fruit]++;
    }
    return cart[fruit];
}

// Function to update the cart display
updateCartDisplay();
</code>
    `;
}

// GSAP Animations on Page Load
window.onload = function() {
    gsap.fromTo('#pageTitle', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 });
    gsap.fromTo('#introTitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1 });
    gsap.fromTo('#codeSection', { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.2 });
}

// Function to display Lottie animation (optional)
function showLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-container');
    lottieContainer.style.display = 'flex'; // Make the Lottie container visible

    // Load the Lottie animation
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'https://assets9.lottiefiles.com/packages/lf20_FMr0gn.json' // Lottie animation URL (cart success)
    });

    // Hide the Lottie animation after it's done
    setTimeout(function() {
        lottieContainer.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}
