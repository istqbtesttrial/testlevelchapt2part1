// Variables to track system states
let paymentProcessed = false;
let inventory = {1: "Item 1", 2: "Item 2", 3: "Item 3"};

// Handle payment processing
document.getElementById('triggerPayment').addEventListener('click', function() {
    document.getElementById('paymentSystem').classList.remove('hidden');
    document.getElementById('triggerPayment').disabled = true; // Disable payment button after payment starts
    gsap.fromTo('#paymentSystem', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
});

// Confirm payment
document.getElementById('confirmPayment').addEventListener('click', function() {
    const cardNumber = document.getElementById('creditCardInput').value;
    const amount = document.getElementById('amountInput').value;
    const result = processPayment(cardNumber, amount);

    displayResult(result);

    if (paymentProcessed) {
        // Enable logic for the inventory system
        document.getElementById('triggerInventory').disabled = false;
    }

    updateCodeBlock();
});

// Handle inventory update
document.getElementById('triggerInventory').addEventListener('click', function() {
    if (!paymentProcessed) {
        displayResult("Inventory cannot be updated without payment!");
    } else {
        document.getElementById('inventorySystem').classList.remove('hidden');
        displayResult(updateInventory());
        gsap.fromTo('#inventorySystem', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    }

    updateCodeBlock();
});

// Function to process payment
function processPayment(cardNumber, amount) {
    if (cardNumber && amount) {
        paymentProcessed = true;
        return "Payment of $" + amount + " processed!";
    }
    return "Please enter valid credit card and amount!";
}

// Function to remove item from inventory
function removeItemFromInventory(itemId) {
    delete inventory[itemId];
    displayInventory();
    displayResult("Item shipped to client!");

    updateCodeBlock();
}

// Function to update inventory
function updateInventory() {
    if (paymentProcessed) {
        return "Inventory ready for shipping!";
    } else {
        return "Inventory cannot be updated without payment!";
    }
}

// Function to display the result
function displayResult(message) {
    const integrationResult = document.getElementById('integrationResult');
    integrationResult.textContent = message;

    // Animate the result
    gsap.fromTo(integrationResult, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });
}

// Function to display inventory
function displayInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    for (const id in inventory) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${inventory[id]}
            <button class="bg-red-400 px-2 py-1 ml-4" onclick="removeItemFromInventory(${id})">Ship to Client</button>
        `;
        inventoryList.appendChild(li);
    }
}

// Function to update the code block dynamically
function updateCodeBlock() {
    const codeBlock = document.getElementById('codeBlock');
    codeBlock.innerHTML = `
<code>
// JavaScript for system integration
let paymentProcessed = ${paymentProcessed};
let inventory = ${JSON.stringify(inventory, null, 2)};

// Function to process payment
function processPayment(cardNumber, amount) {
    if (cardNumber && amount) {
        paymentProcessed = true;
        return "Payment of $" + amount + " processed!";
    }
    return "Please enter valid credit card and amount!";
}

// Function to remove item from inventory
function removeItemFromInventory(itemId) {
    delete inventory[itemId];
    displayInventory();
    displayResult("Item shipped to client!");
}

// Function to update inventory
function updateInventory() {
    if (paymentProcessed) {
        return "Inventory ready for shipping!";
    } else {
        return "Inventory cannot be updated without payment!";
    }
}
</code>
    `;
}

// GSAP animations for page load
window.onload = function() {
    gsap.fromTo('#pageTitle', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    gsap.fromTo('#pageSubtitle', { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2 });
    gsap.fromTo('#introTitle', { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, delay: 0.5 });
    gsap.fromTo('#introText', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.8 });
    gsap.fromTo('#interactiveSection', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 1 });
};
