const InventoryMovement = require("../models/Inventory");
const Product = require("../models/Product");
require("../models/category");
require("../models/user");

/**
 * GET	/api/inventory/low-stock	ดึงรายการสินค้าที่สต็อกต่ำกว่าเกณฑ์	N/A
 * POST	/api/inventory/inbound	บันทึกการรับเข้า (Stock In)	{ productId, quantity: 10, note: "รับสินค้าจาก Supplier A" }
 * POST	/api/inventory/outbound	บันทึกการเบิกออก (Stock Out)	{ productId, quantity: 5, note: "เบิกไปสาขา B" }
 * GET	/api/inventory/movements/:id	ดึงประวัติการเคลื่อนไหวสต็อกของสินค้านั้น ๆ	N/A
 */

const getLowStockProducts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $where: "this.stockCount <= this.minStockLevel",
    })
      .populate("category", "name") // ดึงชื่อหมวดหมู่มาแสดง
      .select("name sku stockCount minStockLevel category")
      .sort({ stockCount: 1 }); // เรียงจากสต็อกน้อยไปมาก

    res.json({
      success: true,
      message: "Low stock products retrieved successfully",
      total: lowStockProducts.length,
      products: lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const recordInbound = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;
    const userId = req.user.id; // ดึง User ID จาก JWT (ต้องผ่าน protect middleware)
    if (!productId || !quantity || quantity <= 0) {
      res.status(400);
      throw new Error("โปรดระบุ Product ID และจำนวนที่รับเข้าที่ถูกต้อง");
    }

    // 1. อัปเดตสต็อกใน Product Model (เพิ่มสต็อก)
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { stockCount: quantity }, // เพิ่มสต็อก
        lastUpdatedBy: userId, // บันทึกผู้ที่ทำรายการ
      },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!updatedProduct) {
      res.status(404);
      throw new Error("ไม่พบสินค้า ID นี้");
    }

    // 2. บันทึกประวัติการเคลื่อนไหว
    await InventoryMovement.create({
      product: productId,
      type: "INBOUND",
      quantity: quantity,
      note: note || "รับสินค้าเข้าคลัง",
      user: userId,
      movementDate: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "บันทึกการรับเข้าสำเร็จ",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const recordOutbound = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity || quantity <= 0) {
      res.status(400);
      throw new Error("โปรดระบุ Product ID และจำนวนที่เบิกออกที่ถูกต้อง");
    }

    // 1. ตรวจสอบสต็อกไม่ให้ติดลบ
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("ไม่พบสินค้า ID นี้");
    }
    if (product.stockCount < quantity) {
      res.status(400);
      throw new Error(`สต็อกสินค้าไม่พอ: มีอยู่ ${product.stockCount} หน่วย`);
    }

    // 2. อัปเดตสต็อกใน Product Model (ลดสต็อก)
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { stockCount: -quantity }, // ลดสต็อก
        lastUpdatedBy: userId,
      },
      { new: true, runValidators: true }
    ).populate("category", "name");

    // 3. บันทึกประวัติการเคลื่อนไหว
    await InventoryMovement.create({
      product: productId,
      type: "OUTBOUND",
      quantity: quantity,
      note: note || "เบิกสินค้าออกจากคลัง",
      user: userId,
      movementDate: Date.now(),
    });

    res.status(200).json({
      success: true,
      message: "บันทึกการเบิกออกสำเร็จ",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const getProductMovements = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      throw new Error("Product ID ไม่ถูกต้อง");
    }

    const movements = await InventoryMovement.find({ product: productId })
      .populate("user", "name email") // ดึงข้อมูลผู้ที่ทำรายการ
      .sort({ movementDate: -1 }); // เรียงจากรายการล่าสุด

    if (movements.length === 0) {
      res.status(404).json({
        success: false,
        message: "ไม่พบประวัติการเคลื่อนไหวสำหรับสินค้านี้",
      });
      return;
    }

    res.status(200).json({
      success: true,
      total: movements.length,
      movements: movements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

module.exports = {
  getLowStockProducts,
  recordInbound,
  recordOutbound,
  getProductMovements,
};
