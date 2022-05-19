const express = require("express");
const router = express.Router();

//middlewares
const { verifyToken, isAdmin } = require("../middlewares/auth");

const {
  orders,
  orderStatus,
  tranferCode,
  listUser,
  updateIsAdmin,
  // showAddress,
} = require("../controllers/admin");

//routes
router.get("/admin/orders", verifyToken, isAdmin, orders);
router.put("/admin/order-status", verifyToken, isAdmin, orderStatus);
router.put("/admin/tranfer-code", verifyToken, isAdmin, tranferCode);

//list user
router.get("/admin/list-user", verifyToken, isAdmin, listUser);
// router.get("/admin/show-Address", verifyToken, isAdmin, showAddress);
router.post("/admin/update-role", verifyToken, isAdmin, updateIsAdmin);

module.exports = router;
