const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  try {
    // อ่าน token จาก cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "กรุณาเข้าสู่ระบบ",
      });
    }

    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เก็บข้อมูล user ไว้ใน req
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token ไม่ถูกต้องหรือหมดอายุ",
    });
  }
}

module.exports = authenticateToken;
