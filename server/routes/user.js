const express = require("express");
const router = express.Router();



const { authCheck } = require("../middlewares/auth");

// const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

// router.post('/user/order', authCheck, createOrder)

module.exports = router;
