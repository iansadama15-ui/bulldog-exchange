const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Mandatory health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', module: 'catalog-api' });
});

// Simple route to list merchandise
app.get('/api/catalog', (req, res) => {
    res.json([
        { id: 1, name: 'NU Bulldog T-Shirt', price: 350 },
        { id: 2, name: 'Campus Lanyard', price: 100 }
    ]);
});

app.listen(port, () => {
    console.log(`Catalog API listening on port ${port}`);
});