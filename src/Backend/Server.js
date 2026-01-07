const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require("./config/db");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Root API
app.get('/', (req, res) => {
  res.json({
    message: 'Student API with JWT Auth',
    endpoints: {
      auth: '/api/auth/signup, /api/auth/signin',
      students: '/api/students (GET public, others protected)'
    }
  });
});

// ✅ Express-5 safe 404 handler
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404, 'validation'));
});

// ✅ Global Error Handler (ONLY ONCE, MUST BE LAST)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
