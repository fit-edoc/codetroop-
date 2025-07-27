const express = require("express");
const router = express.Router();
const { registerVendor, loginVendor, getVendorProfile, getSellerProducts, nearbySellers, addToCart, removeFromCart, reduceCartItemQuantityByOne, increaseCartItemQuantityByOne, getVendorCart, logoutVendor } = require("../Controllers/vendorControllers");
const { isVendorAuthenticated } = require("../middlewares/authMiddleware");

// Route to register a new vendor
router.post("/register", registerVendor);

// Route to login a vendor
router.post("/login", loginVendor);

// Route to get the profile of the logged-in vendor
router.get("/profile", isVendorAuthenticated, getVendorProfile);

// Route to get products from the seller
router.get("/seller-products", getSellerProducts);

// Route to get nearby sellers for the logged-in vendor
router.get("/nearby-sellers", isVendorAuthenticated, nearbySellers);

// Route to add a product to the vendor's cart
router.post("/cart/add", isVendorAuthenticated, addToCart);

// Route to remove a product from the vendor's cart
router.delete("/cart/remove/:productId", isVendorAuthenticated, removeFromCart);

// Route to reduce the quantity of a cart item by one
router.post("/cart/reduce/:productId", isVendorAuthenticated, reduceCartItemQuantityByOne);

// Route to increase the quantity of a cart item by one
router.post("/cart/increase/:productId", isVendorAuthenticated, increaseCartItemQuantityByOne);

// Route to get the vendor's cart
router.get("/cart", isVendorAuthenticated, getVendorCart);

// Route to logout a vendor
router.post("/logout", logoutVendor);


// Export the router
module.exports = router;
