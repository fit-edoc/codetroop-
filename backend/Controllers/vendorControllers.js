const Vendor = require("../models/vendorSchema");
const Seller = require("../models/sellerSchema");

const registerVendor = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const vendor = await Vendor.create({
      username,
      email,
      password,
      phone,
      address,
    });

    if (vendor) {
      const token = vendor.generateJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.status(201).json({
        message: "Vendor registered successfully",
        vendor: vendor
      });
    } else {
      return res.status(500).json({ message: "Failed to register vendor" });
    }
  } catch (error) {
    next(error);
  }
};

const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await vendor.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = vendor.generateJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Vendor logged in successfully",
      vendor: vendor
    });
  } catch (error) {
    next(error);
  }
};

const getVendorProfile = async (req, res) => {
  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    return res.status(200).json({ vendor: vendor });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const nearbySellers = async (req, res) => {
  const city = req.vendor?.address?.city;

  if (!city) {
    return res.status(400).json({ message: "City not provided" });
  }

  try {
    const sellers = await Seller.find({ "address.city": city });

    if (sellers.length === 0) {
      return res.status(404).json({ message: "No sellers found in this city" });
    }

    return res.status(200).json({
      message: "Nearby sellers fetched successfully",
      sellers,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch nearby sellers" });
  }
};

const logoutVendor = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Vendor logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log out vendor" });
  }
}

module.exports = {
  registerVendor,
  loginVendor,
  getVendorProfile,
  nearbySellers,
  logoutVendor
}