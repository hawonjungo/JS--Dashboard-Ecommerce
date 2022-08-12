const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Processed", "Delivered", "Completed", "Cancelled"],
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    basket: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Order = mongoose.model("order", OrderSchema);
