const Product = require("../models/productSchema");
const Seller = require("../models/sellerSchema");

const addProduct = async (req, res, next) => {
  const { name, price, stock, description, hygieneCertified } = req.body;
  const sellerId = req.seller._id;
  try {
    const product = await Product.create({
      name,
      pricePerUnit: price,
      stock: stock,
      supplier: sellerId,
      description,
      hygieneCertified,
    });

    res.status(201).json({
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
}

const getAllProducts = async (req, res, next) => {
  const sellerId = req.seller._id;
  try {
    const products = await Product.find({ supplier: sellerId });
    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("supplier", "username email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
}



module.exports = {
  addProduct,
  getAllProducts,
  getProductById
};