const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  items: [OrderItemSchema], // Array of items
  status: { type: String, default: "Placed" },
  totalAmount: { type: Number, required: true },
  deliveryAddress: {
    pincode: String,
    addressLine: String,
    city: String,
    state: String,
    country: String
  }
},
{
  timestamps: true
});

OrderSchema.methods.updateStatus = function (newStatus) {
  this.status = newStatus;
  return this.save();
};

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
