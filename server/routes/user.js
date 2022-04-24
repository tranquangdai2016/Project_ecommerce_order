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
<<<<<<< HEAD
  createCashOrder
=======
  orders,
<<<<<<< HEAD
>>>>>>> 89d428e6e2c8c5c8e468b8b8cb0d00d3e3ca73d2
=======
  addToWishlist,
  wishlist,
  removeFromWishlist
>>>>>>> a790d222433b5be15894f79ad1989593bfd4cc9b
} = require("../controllers/user");

router.post("/user/cart", authCheck, userCart); //save cart
router.get("/user/cart", authCheck, getUserCart); //get cart
router.delete("/user/cart", authCheck, emptyCart); //empty cart
router.post("/user/address", authCheck, saveAddress);

<<<<<<< HEAD
router.post('user/order', authCheck, createOrder); //stripe
router.post('user/cash-order', authCheck, createCashOrder); //cod
=======
router.post('user/order', authCheck, createOrder);
router.get('user/orders', authCheck, orders);
>>>>>>> 89d428e6e2c8c5c8e468b8b8cb0d00d3e3ca73d2

//coupon

router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//wishlist 
router.post('/user/wishlist',authCheck, addToWishlist);
router.get('/user/wishlist',authCheck, wishlist);
router.put('/user/wishlist/:productId',authCheck, removeFromWishlist);

module.exports = router;
