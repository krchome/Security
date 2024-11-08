class SecureSingleton {
    constructor() {
        if (SecureSingleton.instance) {
            throw new Error("Use SecureSingleton.getInstance() to get an instance of this class.");
        }
        SecureSingleton.instance = this;
        this.id = 1; // Assume some secure ID or role
        this.role = "user"; // Fixed role, unaffected by external input
    }

    static getInstance() {
        if (!SecureSingleton.instance) {
            SecureSingleton.instance = new SecureSingleton();
        }
        return SecureSingleton.instance;
    }
}

// Test the Singleton pattern
const user1 = SecureSingleton.getInstance();
const user2 = SecureSingleton.getInstance();

console.log(user1 === user2); // Should print: true
console.log(user1.role); // Should print: user

// Attempt to create a new instance directly (should throw an error)
try {
    const user3 = new SecureSingleton();
} catch (e) {
    console.log(e.message); // Should print: Use SecureSingleton.getInstance() to get an instance of this class.
}