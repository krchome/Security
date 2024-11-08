const express = require('express');
const cookieParser = require('cookie-parser');
const Ajv = require('ajv');

const app = express();
const ajv = new Ajv();
app.use(cookieParser());

// Define the schema for validating the user cart
const cartSchema = {
    type: 'object',
    properties: {
        userId: { type: 'number' },
        role: { type: 'string', enum: ['user', 'admin'] },
        cartItems: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    productId: { type: 'number' },
                    quantity: { type: 'number' }
                },
                required: ['productId', 'quantity']
            }
        }
    },
    required: ['userId', 'role', 'cartItems']
};

// Function to validate the cart data
function validateCart(cart) {
    const validate = ajv.compile(cartSchema);
    const valid = validate(cart);

    if (!valid) {
        console.error("Validation errors:", validate.errors); // Log validation errors// Log errors to help with debugging
        throw new Error('Invalid cart data');
    }
}

// Middleware to set a cart cookie for demonstration
app.get('/setCart', (req, res) => {
    const userCart = {
        userId: 123,
        role: 'user',
        cartItems: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    };

    res.cookie('cart', JSON.stringify(userCart));
    res.send('Cart has been set!');
});

// Route to validate the deserialized cart data
app.get('/cart', (req, res) => {
    try {
        console.log('Cookies:', req.cookies); // Log all cookies to check if cart is set
        // Deserialize the cart from the cookie
        
        const userCart = JSON.parse(req.cookies.cart);
        console.log("Deserialized userCart:", userCart); // Log the deserialized cart data
        // Validate the cart data using the schema
        validateCart(userCart);

        // Process the valid data
        res.send('Cart data is valid');
    } catch (error) {
        console.error('Error detected:', error.message); // Log error details
        res.status(400).send('Invalid cart data detected');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
