const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // รูปแบบ: Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // ไม่พบ Token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token ไม่ถูกต้อง/หมดอายุ

    // แนบข้อมูลผู้ใช้ที่ถอดรหัสได้ (เช่น { id: 123, email: 'user@example.com' })
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;