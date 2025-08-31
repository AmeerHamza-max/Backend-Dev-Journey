const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory data storage with some dummy products
let products = [
  { id: 1, name: 'Laptop', price: 1200, description: 'Gaming laptop' },
  { id: 2, name: 'Phone', price: 800, description: 'Smartphone' },
  { id: 3, name: 'Headphones', price: 150, description: 'Wireless headphones' }
];
let nextId = 4; // next ID to assign

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// CREATE new product
app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;

  // Validate input
  if (!name || !price) return res.status(400).json({ message: 'Name and price are required' });

  const newProduct = {
    id: nextId++,
    name,
    price,
    description: description || ''
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// UPDATE product by ID
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, price, description } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;

  res.json(product);
});

// DELETE product by ID
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });

  const deletedProduct = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deletedProduct[0] });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
