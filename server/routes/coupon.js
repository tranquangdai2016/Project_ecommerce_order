const express = require("express");

const router = express.Router();

//middlewares
const {
    verifyToken,
    isAdmin
} = require('../middlewares/auth');

//import
const { create, remove, list } = require("../controllers/coupon");

//routes
router.post("/coupon", verifyToken, isAdmin, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", verifyToken, isAdmin, remove);

module.exports = router;
