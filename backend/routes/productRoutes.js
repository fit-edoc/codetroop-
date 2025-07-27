const express = require("express");
const router = express.Router();

const { addProduct, getAllProducts, getProductById } = require("../Controllers/productContollers");
const { isSellerAuthenticated, isVendorAuthenticated } = require("../middlewares/authMiddleware");

// Route to add a new product
router.post("/add", isSellerAuthenticated, addProduct);

// Route to get all products for the logged-in seller
router.get("/all", isSellerAuthenticated, getAllProducts);

// Route to get a product by its ID
router.get("/:id", getProductById);

// Export the router
module.exports = router;