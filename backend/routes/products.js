const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  createProduct,
  getallProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

router.get("/", getallProducts);

router.get("/:id", getProductById);

router.post("/", authenticateToken, createProduct);

router.put("/:id", authenticateToken, updateProductById);

router.delete("/:id", authenticateToken, deleteProductById);

module.exports = router;
