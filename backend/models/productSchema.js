const mongoose = require("mongoose");
const Seller = require("./sellerSchema");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    pricePerUnit: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    supplier: { 
      type: mongoose.Schema.Types.ObjectId, ref: "Seller",
      required: true,
    },

    description: {
      type: String,
    },

    hygieneCertified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
