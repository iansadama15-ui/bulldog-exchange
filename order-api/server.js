const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Mandatory health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', module: 'order-api' });
});

// Sample Orders Endpoint
app.get('/api/orders', (req, res) => {
    res.json([
        { id: 101, item: 'NU Bulldog T-Shirt', quantity: 1, total: 350, status: 'Completed' }
    ]);
});

app.listen(port, () => {
    console.log(`Order API listening on port ${port}`);
});