const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success : true,
    message: "Products endpoint",
  });
});

router.get("/:id", (req, res) => {
  const productId = req.params.id;
  res.json({
    success : true,
    message: `Product details for ID: ${productId}`,
  });
});

router.post("/", (req, res) => {
  const { name, sku, category, price, stockCount, description } = req.body;
  res.status(201).json({
    success: true,
    message: "Product created",
    product: { name, sku, category, price, stockCount, description },
  });
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const { name, sku, category, price, stockCount, description } = req.body;
  res.json({
    success: true,
    message: `Product updated for ID: ${productId}`,
    product: { name, sku, category, price, stockCount, description },
  });
});

router.delete("/:id", (req, res) => {
  const productId = req.params.id;
  res.json({
    success: true,
    message: `Product deleted for ID: ${productId}`,
  });
});

module.exports = router;
