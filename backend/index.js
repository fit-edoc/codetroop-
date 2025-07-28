const express = require("express");
const app = express();
const dbConnect = require("./database/dbConnection");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// importing routers
const vendorRoutes = require("./routes/vendorRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");

// using routers
app.use("/api/vendor", vendorRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message,
  });
});

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });
