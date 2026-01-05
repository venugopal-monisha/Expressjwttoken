const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Student API with JWT Auth ',
    endpoints: {
      auth: '/api/auth/signup, /api/auth/signin',
      students: '/api/students (GET public, others protected)'
    }
  });
});

// 404 Handler (LAST)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running: http://localhost:${PORT}`);
});