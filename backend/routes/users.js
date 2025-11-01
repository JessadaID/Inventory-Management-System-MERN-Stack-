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

router.put("/profile", authenticateToken, editProfile);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", authenticateToken ,logoutUser);

module.exports = router;
