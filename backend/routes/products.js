const express = require("express");
const router = express.Router();
const {
  createProduct,
  getallProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

router.get("/", getallProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

module.exports = router;
