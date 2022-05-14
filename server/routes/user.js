const express = require("express");

const router = express.Router();
//middlewates
const { verifyToken } = require("../middlewares/auth");
//controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  createCashOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist
} = require("../controllers/user");

router.post("/user/cart", verifyToken, userCart); //save cart
router.get("/user/cart", verifyToken, getUserCart); //get cart
router.delete("/user/cart", verifyToken, emptyCart); //empty cart
router.post("/user/address", verifyToken, saveAddress);

router.post('/user/order', verifyToken, createOrder); //stripe
router.post('/user/cash-order', verifyToken, createCashOrder); //cod
// router.post('user/order', verifyToken, createOrder);
router.get('/user/orders', verifyToken, orders);

//coupon

router.post("/user/cart/coupon", verifyToken, applyCouponToUserCart);

//wishlist 
router.post('/user/wishlist',verifyToken, addToWishlist);
router.get('/user/wishlist',verifyToken, wishlist);
router.put('/user/wishlist/:productId',verifyToken, removeFromWishlist);

module.exports = router;
