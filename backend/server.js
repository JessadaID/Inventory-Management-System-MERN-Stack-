const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3000;

const productsRouter = require("./routes/products");
const userRouter = require("./routes/users");
const inventoryRouter = require("./routes/inventory");

// Database Connection
const connectDB = require("./db/database");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/inventory", inventoryRouter);

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api/', apiLimiter);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Inventory Management System API",
    version: "1.0.0",
    endpoint: {
      products: "/api/products",
      inventory: "/api/inventory",
    },
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
    }
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
