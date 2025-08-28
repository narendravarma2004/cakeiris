let cart = [];

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    displayCart();
    showToast(); // Show toast notification when item is added
}

// Function to display cart contents
function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');
        
        // Display product name and quantity controls
        li.innerHTML = `${product.name} (₹${product.price}) 
                        <button class="quantity-btn" onclick="decreaseQuantity('${product.name}')">-</button>
                        <span>${product.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity('${product.name}')">+</button>`;
        
        // Append delete button for each item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => removeFromCart(product.name);
        li.appendChild(deleteBtn);

        cartItemsElement.appendChild(li);
        total += product.price * product.quantity;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

// Function to increase quantity
function increaseQuantity(name) {
    const item = cart.find(product => product.name === name);
    if (item) {
        item.quantity++;
        displayCart(); // Refresh the cart display
    }
}

// Function to decrease quantity
function decreaseQuantity(name) {
    const item = cart.find(product => product.name === name);
    if (item && item.quantity > 1) { // Prevent quantity going below 1
        item.quantity--;
        displayCart(); // Refresh the cart display
    }
}

// Function to remove an item from the cart
function removeFromCart(name) {
    cart = cart.filter(product => product.name !== name);
    displayCart(); // Refresh the cart display
}

// Function to simulate proceeding to buy
function proceedToBuy() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to buy. Thank you for your purchase!');
        cart = []; // Empty the cart after purchase
        displayCart();
    }
}

// Show and hide the cart modal
function showCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productBox = event.target.closest('.box');
        const productName = productBox.querySelector('h3').textContent;
        const productPrice = parseFloat(productBox.querySelector('.price').textContent.replace('₹', ''));
        
        addToCart(productName, productPrice);
    });
});

// Toast notification function
function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000); // Toast visible for 3 seconds
}

