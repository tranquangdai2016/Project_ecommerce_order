const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    phone: {
      type: String,
      trim: true,
      required: "phone is required",
    },
    receiveAddress: {
      type: String,
      trim: true,
      required: "receiveAddress is required",
    },
    city: {
      type: String,
      trim: true,
      required: "receiveAddress is required",
    },
    district: {
      type: String,
      trim: true,
      required: "receiveAddress is required",
    },
    wards: {
      type: String,
      trim: true,
      required: "receiveAddress is required",
    },

    // slug: {
    //     type: String,
    //     unique: true,
    //     lowercase: true,
    //     index: true,
    // },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
