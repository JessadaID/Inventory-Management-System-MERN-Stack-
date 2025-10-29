const Product = require("../models/productModel");

/**
 * POST	/api/products	เพิ่ม สินค้าใหม่	{ name, sku, category, stockCount, price, description }
 * GET	/api/products	ดึง สินค้าทั้งหมด (รองรับ Query Params เช่น ?search=... หรือ ?category=...)	N/A
 * GET	/api/products/:id	ดึง สินค้าตาม ID	N/A
 * PUT	/api/products/:id	แก้ไข ข้อมูลสินค้าตาม ID	{ name, price, description } (บางส่วน)
 * DELETE	/api/products/:id	ลบ สินค้าตาม ID	N/A
 */

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
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
      ...(category && { category }),
    })
      .limit(limit)
      .skip((page - 1) * limit);
    res.json({
      success: true,
      message: "Products retrieved successfully",
      page: page,
      limit: limit,
      total: products.length,
      products: products,
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
