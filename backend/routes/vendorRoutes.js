const express = require("express");
const router = express.Router();
const { registerVendor, loginVendor, getVendorProfile, nearbySellers, addToCart, logoutVendor } = require("../Controllers/vendorControllers");
const { isVendorAuthenticated } = require("../middlewares/authMiddleware");

// Route to register a new vendor
router.post("/register", registerVendor);

// Route to login a vendor
router.post("/login", loginVendor);

// Route to get the profile of the logged-in vendor
router.get("/profile", isVendorAuthenticated, getVendorProfile);

// Route to get nearby sellers for the logged-in vendor
router.get("/nearby-sellers", isVendorAuthenticated, nearbySellers);

// Route to add a product to the vendor's cart
router.post("/cart/add", isVendorAuthenticated, addToCart);

// Route to logout a vendor
router.post("/logout", logoutVendor);


// Export the router
module.exports = router;
