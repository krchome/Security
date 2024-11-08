const express = require('express');
const jwt = require('jsonwebtoken'); // JWT library for signing tokens
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// Secret key for signing JWT
const SECRET_KEY = 'your-secure-secret-key';

// Generate a signed JWT token with user cart data
function generateSignedToken(userCart) {
    return jwt.sign(userCart, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to verify and decode JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error('Invalid or tampered token');
    }
}

app.get('/cart', (req, res) => {
    try {
        // Retrieve the JWT token from cookies
        const token = req.cookies.cartToken;

        // Verify and decode the JWT token
        const userCart = verifyToken(token);

        // Now we have a valid, tamper-proof cart object
        if (userCart.role === 'admin') {
            res.send('Welcome, Admin!');
        } else {
            res.send('Welcome, User! Your Cart: ' + JSON.stringify(userCart.cartItems));
        }
    } catch (error) {
        res.status(401).send('Invalid or tampered token detected');
    }
});

// Example of how to set the token cookie (for illustrative purposes)
app.get('/login', (req, res) => {
    // Simulate a user cart after login
    const userCart = {
        userId: 123,
        role: 'user',
        cartItems: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    };

    // Generate the signed JWT token
    const token = generateSignedToken(userCart);

    // Set the token in the cookie
    res.cookie('cartToken', token);
    res.send('Logged in and token set in cookie');
});

app.listen(3000, () => console.log('Server running on port 3000'));
