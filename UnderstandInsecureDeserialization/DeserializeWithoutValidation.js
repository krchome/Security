// DeserializeWithoutValidation.js
const express = require('express');
const cookieParser = require('cookie-parser');
const { cart, setRole } = require('./cart');

const app = express();
app.use(cookieParser());

// Simulate setting a role and saving the cart as a cookie (insecurely)
setRole('admin'); // Set role to 'admin' for demonstration

app.get('/setCart', (req, res) => {
    // Setting cart as a cookie without validation
    res.cookie('cart', JSON.stringify(cart));
    res.send('Cart has been set with role: ' + cart.role);
});

app.get('/cart', (req, res) => {
    const userCart = JSON.parse(req.cookies.cart); // Deserializing the cart from the cookie

    // Check if user is an admin
    if (userCart.role === 'admin') {
        console.log("Welcome, Admin!"); // Log to console
        res.send('Welcome, Admin!');
    } else {
        console.log("Welcome, User!"); // Log to console
        res.send('Welcome, User! Your Cart: ' + JSON.stringify(userCart.items));
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
