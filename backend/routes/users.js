const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const {
  getUserProfile,
  registerUser,
  loginUser,
  editProfile,
  logoutUser,
} = require("../controller/userController");

// get current user profile
router.get("/profile", authenticateToken, getUserProfile);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/profile", authenticateToken, editProfile);

router.post("/logout", logoutUser);

module.exports = router;
