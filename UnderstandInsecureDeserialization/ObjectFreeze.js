const User = function (id, role) {
    this.id = id;
    this.role = role;
    Object.freeze(this); // Freeze to prevent modifications after deserialization
};

const deserializedUser = new User(123, "user");

// Attempts to modify properties will fail
deserializedUser.role = "admin"; // Will not change in a frozen object
console.log(deserializedUser.role); // Output: user