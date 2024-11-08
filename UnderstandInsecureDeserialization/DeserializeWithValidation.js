// DeserializeWithValidation.js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Middleware to validate deserialized data
function validateUserCart(cart) {
    const validRoles = ['user', 'admin'];
    
    // Check if the cart object contains valid fields
    if (typeof cart.userId !== 'number' || !validRoles.includes(cart.role)) {
        throw new Error('Invalid cart data');
    }

    // Validate each item in the cart
    cart.cartItems.forEach(item => {
        if (typeof item.productId !== 'number' || typeof item.quantity !== 'number') {
            throw new Error('Invalid cart item data');
        }
    });
}

// Route to set a cookie with a valid role
app.get('/setCart', (req, res) => {
    const initialCart = {
        userId: 1,
        role: 'user', // Set initial role as 'user'
        cartItems: [
            { productId: 123, quantity: 2 },
            { productId: 456, quantity: 1 }
        ]
    };

    // Serialize and set the cart as a cookie (for demonstration purposes)
    res.cookie('cart', JSON.stringify(initialCart));
    res.send('Cart has been set with role: ' + initialCart.role);
});

// Route to validate and respond based on deserialized cart data
app.get('/cart', (req, res) => {
    try {
        // Deserialize the cookie
        const userCart = JSON.parse(req.cookies.cart);

        // Validate the deserialized data
        validateUserCart(userCart);

        // Respond based on the user's role
        if (userCart.role === 'admin') {
            res.send('Welcome, Admin!');
        } else {
            res.send('Welcome, User! Your Cart: ' + JSON.stringify(userCart.cartItems));
        }
    } catch (error) {
        res.status(400).send('Invalid data detected');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
