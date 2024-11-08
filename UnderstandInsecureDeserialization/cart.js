// cart.js
const cartData = '{"items": [{"productId": "123", "quantity": 2}, {"productId": "456", "quantity": 1}], "totalPrice": 100}';

// Deserialize without validation
const cart = JSON.parse(cartData);

function addToCart(cartItem) {
    cart.items.push(cartItem);
    console.log('Item added to cart:', cartItem);
}



module.exports = { addToCart, cart };

/* {
    "items": [{"productId": "123", "quantity": 2}, {"productId": "456", "quantity": 1}],
    "totalPrice": 100,
    "role": "admin"
}
 */