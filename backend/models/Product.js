const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name required"],
      trim: true,
      minlength: [2, "Name must be 2+ chars"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price required"],
      min: [0, "Price must be positive"],
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
