// ============= config/jwt.js =============
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d', // token หมดอายุใน 7 วัน
  });
};

module.exports = { generateToken };