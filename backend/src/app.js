// Import dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const salasRoutes = require('./routes/salasRoutes');
const reservasRoutes = require('./routes/reservasRoutes');

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/salas', salasRoutes);
app.use('/reservas', reservasRoutes);
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
