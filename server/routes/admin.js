const express = require("express");
const router = express.Router();

//middlewares
const { verifyToken, isAdmin } = require("../middlewares/auth");

const { orders, orderStatus, tranferCode } = require("../controllers/admin");

//routes
router.get("/admin/orders", verifyToken, isAdmin, orders);
router.put("/admin/order-status", verifyToken, isAdmin, orderStatus);
router.put("/admin/tranfer-code", verifyToken, isAdmin, tranferCode);

module.exports = router;
