const Coupon = require("../models/coupon");

//create, remove, list

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    // return;
    const { code, expiry, discount } = req.body.coupon;
    console.log(code, expiry, discount);
    res.json(await new Coupon({ code, expiry, discount, isUse: false }).save());
  } catch (error) {
    console.log(error);
    res.json(500);
  }
};

exports.remove = async (req, res) => {
  try {
    console.log(req.params.couponId);
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (error) {
    console.log(err);
  }
};
