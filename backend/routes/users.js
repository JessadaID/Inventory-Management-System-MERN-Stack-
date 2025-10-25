const express = require("express");
const router = require("./products");
const ronter = express.Router();

ronter.get("/profile", (req, res) => {
  res.json({
    success: true,
    message: "User profile retrieved successfully",
    user: { username: "johndoe", email: "", "role": "user" },
  });
});

router.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  res.json({
    success: true,
    message: "User registered successfully",
    user: { username, password, email },
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({
    success: true,
    message: "User logged in successfully",
    user: { username, password },
  });
});

router.put("/profile", (req, res) => {
    const { username, email } = req.body;
  res.json({
    success: true,
    message: "User profile updated successfully",
    user: { username, email },
  });
});

router.post("/logout", (req, res) => {
    const { username } = req.body;
  res.json({
    success: true,
    message: "User logged out successfully",
    user: { username },
  });
});

module.exports = ronter;
