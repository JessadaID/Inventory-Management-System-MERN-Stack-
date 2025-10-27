const mongoose = require("mongoose");

const inventoryMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["INBOUND", "OUTBOUND"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    movementDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);

module.exports = InventoryMovement;
