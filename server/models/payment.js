const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: ObjectId,
      ref: "Order",
      required: true,
    },
    image: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
