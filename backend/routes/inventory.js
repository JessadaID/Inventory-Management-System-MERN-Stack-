const express = require("express");
const router = express.Router();
const {
  getLowStockProducts,
  recordInbound,
  recordOutbound,
  getProductMovements,
  getProductMovementsbyId,
} = require("../controller/inventoryController");
const authenticateToken = require("../middleware/auth");

router.get("/low-stock", authenticateToken, getLowStockProducts);

router.post("/inbound", authenticateToken, recordInbound);

router.post("/outbound", recordOutbound);

router.get("/movements/:id", getProductMovementsbyId);

router.get("/movements", getProductMovements);

module.exports = router;
