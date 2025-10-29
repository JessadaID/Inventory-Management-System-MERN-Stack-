const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const getUserProfile = (req, res) => {
  const user = req.user;
  res.json({
    success: true,
    message: "User profile retrieved successfully",
    user: user,
  });
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = { email, password: hash, name };

    // 2. ตรวจสอบว่ามีอีเมลนี้อยู่ในระบบแล้วหรือไม่ (Optional แต่แนะนำ)
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
      return;
    }

    const newUser = await User.create(user);
    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Invalid password.",
      });
    }

    if (user && isPasswordValid) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        success: true,
        message: "Authentication successful",
        user: { email: user.email, role: user.role },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const editProfile = async (req, res) => {
    try {
    const user = req.user;

    const updateinfo = await User.findByIdAndUpdate(user.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateinfo) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const token = generateAccessToken({
      id: updateinfo._id,
      email: updateinfo.email,
      role: updateinfo.role,
      name: updateinfo.name,
    });

    res.json({
      success: true,
      message: "User profile updated successfully",
      user: updateinfo,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error : ${error.message}`,
    });
  }
};

const logoutUser = (req, res) => {
  res.json({
    success: true,
    message: "User logged out successfully",
  });
};


module.exports = {
  getUserProfile,
  registerUser,
  loginUser,
  editProfile,
  logoutUser,
};
