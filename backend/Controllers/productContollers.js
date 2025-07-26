const Product = require("../models/productModel");

const addProduct = async (req, res, next) => {
  const { name, price, stock, description, hygieneCertified } = req.body;
  const sellerId = req.seller._id;
  try {
    const product = await Product.create({
      name,
      pricePerUnit: price,
      stock: stock, // Assuming stock is managed separately
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