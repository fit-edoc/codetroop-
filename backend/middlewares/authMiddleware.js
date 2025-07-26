const Vendor = require("../models/vendorSchema");
const Seller = require("../models/sellerSchema");
const jwt = require("jsonwebtoken");

const isVendorAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const vendor = await Vendor.findById(decodedToken.id);

    if (!vendor) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token",
      });
    }

    req.vendor = vendor;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const isSellerAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const seller = await Seller.findById(decodedToken.id);

    if (!seller) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token",
      });
    }

    req.seller = seller;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { isVendorAuthenticated, isSellerAuthenticated };
