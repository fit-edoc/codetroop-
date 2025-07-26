const Seller = require("../models/sellerSchema");

const registerSeller = async (req, res, next) => {
  try {
    const { username, email, password, phone, address } = req.body;

    if (!username || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Seller already exists" });
    }

    const seller = await Seller.create({
      username,
      email,
      password,
      phone,
      address,
    });

    if (seller) {
      const token = seller.generateJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.status(201).json({
        message: "Seller registered successfully",
        seller: seller,
      });
    } else {
      return res.status(500).json({ message: "Failed to register seller" });
    }
  } catch (error) {
    next(error);
  }
};

const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const seller = await Seller.findOne({ email });
    if (!seller || !(await seller.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = seller.generateJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      message: "Seller logged in successfully",
      seller: seller,
    });
  } catch (error) {
    next(error);
  }
};

const getSellerProfile = (req, res) => {
  try {
    const seller = req.seller;
    return res.status(200).json({
      message: "Seller profile fetched successfully",
      seller: {
        id: seller._id,
        username: seller.username,
        email: seller.email,
        phone: seller.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch seller profile" });
  }
};

const logoutSeller = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Seller logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to log out" });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  getSellerProfile,
  logoutSeller,
};
