require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const bookRoutes = require('./routes/book-routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.get('/', (req, res) => {
  res.send('Server is running ✅');
});

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
});
