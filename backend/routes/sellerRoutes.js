const express = require("express");
const router = express.Router();
const { registerSeller, loginSeller, getSellerProfile ,logoutSeller } = require("../Controllers/sellerControllers");
const { isSellerAuthenticated } = require("../middlewares/authMiddleware");

// Route to register a new vendor
router.post("/register", registerSeller);

// Route to login a vendor
router.post("/login", loginSeller);

// Route to get the profile of the logged-in seller
router.get("/profile", isSellerAuthenticated ,getSellerProfile);

// Route to logout a vendor
router.post("/logout", logoutSeller);


// Export the router
module.exports = router;