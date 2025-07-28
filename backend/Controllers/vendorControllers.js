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

const getSellerProducts = async (req, res) => {
  const sellerId = req.params.sellerId;
  if (!sellerId) {
    return res.status(400).json({ message: "Seller ID is required" });
  }
  try {
    const seller = await Seller.findById(sellerId).populate("products");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    return res.status(200).json({
      message: "Seller products fetched successfully",
      products: seller.products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch seller products" });
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = vendor.cart || [];
    const existingItem = cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    vendor.cart = cart;
    await vendor.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      productId,
      quantity,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add product to cart" });
  }
};  

const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = vendor.cart || [];
    const updatedCart = cart.filter(item => item.productId.toString() !== productId);
    vendor.cart = updatedCart;
    await vendor.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      productId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove product from cart" });
  }
}

const reduceCartItemQuantityByOne = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = vendor.cart || [];
    const item = cart.find(item => item.productId.toString() === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return res.status(400).json({ message: "Cannot reduce quantity below 1" });
      }
      await vendor.save();
      return res.status(200).json({
        message: "Cart item quantity reduced successfully",
        productId,
        quantity: item.quantity,
      });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to reduce cart item quantity" });
  }
}

const increaseCartItemQuantityByOne = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = vendor.cart || [];
    const item = cart.find(item => item.productId.toString() === productId);
    if (item) {
      item.quantity += 1;
      await vendor.save();
      return res.status(200).json({
        message: "Cart item quantity increased successfully",
        productId,
        quantity: item.quantity,
      });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to increase cart item quantity" });
  }
}

const getVendorCart = async (req, res) => {
  try {
    const vendor = req.vendor;
    if (!vendor) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const cart = vendor.cart || [];
    return res.status(200).json({
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
}

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
  getSellerProducts,
  nearbySellers,
  addToCart,
  removeFromCart,
  reduceCartItemQuantityByOne,
  increaseCartItemQuantityByOne,
  getVendorCart,
  logoutVendor
}