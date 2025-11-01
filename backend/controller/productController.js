const Product = require("../models/Product");

/**
 * POST	/api/products	เพิ่ม สินค้าใหม่	{ name, sku, category, stockCount, price, description }
 * GET	/api/products	ดึง สินค้าทั้งหมด (รองรับ Query Params เช่น ?search=... หรือ ?category=...)	N/A
 * GET	/api/products/:id	ดึง สินค้าตาม ID	N/A
 * PUT	/api/products/:id	แก้ไข ข้อมูลสินค้าตาม ID	{ name, price, description } (บางส่วน)
 * DELETE	/api/products/:id	ลบ สินค้าตาม ID	N/A
 */

function stockLevelValidator(stockCount, lowStockLevel) {
  const highStockLevel = lowStockLevel + 10;
  if (stockCount <= lowStockLevel) {
    return "Low";
  } else if (stockCount <= highStockLevel) {
    return "Medium";
  } else {
    return "High";
  }
}

const createProduct = async (req, res) => {
  try {
    const productsData = req.body;
    let result;

    if (Array.isArray(productsData)) {
      if (productsData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Empty array provided for bulk creation.",
        });
      }

      result = await Product.insertMany(productsData, { ordered: false });
      res.status(201).json({
        success: true,
        message: `${result.length} products created successfully.`,
        products: result,
      });
    } else if (typeof productsData === "object" && productsData !== null) {
      // 📦 กรณีที่ 2: การสร้างรายการเดียว (Single Create)
      result = await Product.create(productsData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Invalid data format. Expected a single object or an array of objects.",
      });
    }
  } catch (error) {
    console.error("Error details:", error);
    const statusCode =
      error.name === "ValidationError" || error.code === 11000 ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      message: `Error during product creation: ${error.message}`,
      details: error.writeErrors
        ? error.writeErrors.map((e) => e.errmsg)
        : undefined,
    });
  }
};
const getallProducts = async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let search = req.query.search || "";
  let category = req.query.category || "";

  try {
    // 1. สร้างเงื่อนไขการค้นหา (Match Condition)
    const matchCondition = {
      name: { $regex: search, $options: "i" },
      ...(category && { category }),
    };

    // 2. ดึงจำนวนทั้งหมด (Total Count) ที่ตรงตามเงื่อนไข
    // ต้องเปลี่ยนมาใช้ matchCondition แทน {} เพื่อให้จำนวนถูกต้อง
    const totalCount = await Product.countDocuments(matchCondition); 

    // 3. คำนวณราคารวมทั้งหมด (Total Price) ที่ตรงตามเงื่อนไข
    const aggregationResult = await Product.aggregate([
      // A. ขั้นตอน Match: กรองสินค้าตาม search และ category
      { $match: matchCondition },
      // B. ขั้นตอน Group: รวมเอกสารทั้งหมดเป็นหนึ่งเดียวและคำนวณผลรวมของฟิลด์ price
      { 
        $group: {
          _id: null, // รวมทั้งหมด
          totalPrice: { $sum: "$price" },
        } 
      }
    ]);

    // ดึงค่า totalPrice จากผลลัพธ์ (ถ้ามีผลลัพธ์)
    const totalDatabasePrice = 
      aggregationResult.length > 0 ? aggregationResult[0].totalPrice : 0;
    
    // 4. ดึงข้อมูลสินค้าที่ถูกแบ่งหน้า (Pagination)
    const products = await Product.find(matchCondition)
      .limit(limit)
      .populate("category", "name")
      .sort({ name: 1 })
      .skip((page - 1) * limit);

    // 5. คำนวณ lowStockcount เฉพาะในหน้านี้ (Current Page)
    const lowStockcount = products.filter(
      (product) =>
        stockLevelValidator(product.stockCount, product.minStockLevel) === "Low"
    ).length;
    
    res.json({
      success: true,
      message: "Products retrieved successfully",
      page: page,
      limit: limit,
      total: totalCount, // จำนวนสินค้าทั้งหมด (ที่ตรงเงื่อนไข)
      products: products.map((product) => ({
        ...product.toObject(),
        stockLevel: stockLevelValidator(
          product.stockCount,
          product.minStockLevel
        ),
      })),
      lowStockcount: lowStockcount,
      totalPrice: totalDatabasePrice, 
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({
      success: true,
      message: `Product details for ID: ${productId}`,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, sku, category, price, stockCount, description } = req.body;

    const updatedProduct = {
      name,
      sku,
      category,
      price,
      stockCount,
      description,
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: `Product updated for ID: ${productId}`,
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: `Product deleted for ID: ${productId}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

module.exports = {
  createProduct,
  getallProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
