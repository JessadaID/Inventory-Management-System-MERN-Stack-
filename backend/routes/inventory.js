const express = require("express");
const router = express.Router();

/**
 * GET	/api/inventory/low-stock	ดึงรายการสินค้าที่สต็อกต่ำกว่าเกณฑ์	N/A
POST	/api/inventory/inbound	บันทึกการรับเข้า (Stock In)	{ productId, quantity: 10, note: "รับสินค้าจาก Supplier A" }
POST	/api/inventory/outbound	บันทึกการเบิกออก (Stock Out)	{ productId, quantity: 5, note: "เบิกไปสาขา B" }
GET	/api/inventory/movements/:id	ดึงประวัติการเคลื่อนไหวสต็อกของสินค้านั้น ๆ	N/A
 */
router.get("/low-stock", (req, res) => {
  res.json({
    success: true,
    message: "Products endpoint",
  });
});

router.post("/inbound", (req, res) => {
  const { productId, quantity, note } = req.body;
  res.status(201).json({
    success: true,
    message: "Product created",
    product: { productId, quantity, note },
  });
});

router.post("/outbound", (req, res) => {
  const { productId, quantity, note } = req.body;
  res.status(201).json({
    success: true,
    message: "Product created",
    product: { productId, quantity, note },
  });
});

router.get("/movements/:id", (req, res) => {
  const productId = req.params.id;
  res.json({
    success: true,
    message: `Product details for ID: ${productId}`,
  });
});

module.exports = router;
