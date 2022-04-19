const express = require("express");

const router = express.Router();
//middlewates
const { authCheck } = require("../middlewares/auth");
//controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  createCashOrder
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user/cart", authCheck, getUserCart); //get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress);

router.post('user/order', authCheck, createOrder); //stripe
router.post('user/cash-order', authCheck, createCashOrder); //cod

//coupon

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

module.exports = router;
