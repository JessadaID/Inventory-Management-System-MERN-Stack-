const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;
const productsRouter = require("./routes/products");
const userRouter = require("./routes/users");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);

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
