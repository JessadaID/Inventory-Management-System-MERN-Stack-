const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email : { // for login
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "staff",
      enum: ["admin","staff"],
    },
    name : {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
