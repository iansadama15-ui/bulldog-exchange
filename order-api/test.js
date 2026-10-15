const assert = require('assert');

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const sampleItems = [
    { price: 350, quantity: 2 },
    { price: 100, quantity: 1 }
];

// Verify 2 * 350 + 100 = 800
assert.strictEqual(calculateTotal(sampleItems), 800, "Order calculation failed!");
console.log("Pass: Order API unit tests passed successfully!");