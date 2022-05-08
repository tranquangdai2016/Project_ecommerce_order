const express = require("express");
const router = express.Router();

//middlewares
const { verifyToken, isAdmin } = require("../middlewares/auth");

const { orders, orderStatus } = require("../controllers/admin");

//routes
router.get("/admin/orders", verifyToken, isAdmin, orders);
router.put("/admin/order-status", verifyToken, isAdmin, orderStatus);

module.exports = router;
