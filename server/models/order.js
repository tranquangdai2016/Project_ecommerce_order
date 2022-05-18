const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    coupon: { type: String, default: "" },
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not processed",
      // enum: [
      //     "Not processed",
      //     "Cash On Delivery",
      //     "Processing",
      //     "Dispatched",
      //     "Cancelled",
      //     "Completed",
      // ]
    },
    transportCode: { type: String, default: "" },
    orderdBy: { type: ObjectId, ref: "User" },
    addressId: { type: ObjectId, ref: "Address" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
