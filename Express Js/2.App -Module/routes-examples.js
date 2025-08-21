const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to our home page');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});

// Mock data
const products = [
    { id: 1, label: 'product 1' },
    { id: 2, label: 'product 2' },
    { id: 3, label: 'product 3' },
];

// ✅ Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// ✅ Get a single product by id
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const getSingleProduct = products.find(product => product.id === productId);

    if (getSingleProduct) {
        res.json(getSingleProduct);
    } else {
        res.status(404).send('Product not found, please try with a different id');
    }
});
