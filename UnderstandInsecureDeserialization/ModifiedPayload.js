// Modified payload
const modifiedPayload = {
    userId: 123,
    role: "admin",
    cartItems: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 }
    ],
    iat: Math.floor(Date.now() / 1000), // issued at time
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // expiration time
};

// Convert to JSON and encode
const base64UrlEncode = (str) => {
    return btoa(JSON.stringify(str))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

const base64Payload = base64UrlEncode(modifiedPayload);
console.log("Base64Url Encoded Payload:", base64Payload);
