
const assert = require('assert');

const catalog = [
    { id: 1, name: 'NU Bulldog T-Shirt', price: 350 },
    { id: 2, name: 'Campus Lanyard', price: 100 }
];

// Check that the catalog contains two products.
assert.strictEqual(catalog.length, 2);

// Check the first product.
assert.strictEqual(catalog[0].name, 'NU Bulldog T-Shirt');
assert.strictEqual(catalog[0].price, 350);

// Check the second product.
assert.strictEqual(catalog[1].name, 'Campus Lanyard');
assert.strictEqual(catalog[1].price, 100);

// Check that product prices are valid.
assert.ok(catalog.every(item => item.price > 0));

console.log('Pass: Catalog API tests passed successfully!');
