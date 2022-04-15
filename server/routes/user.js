const express = require("express");

const router = express.Router();
//middlewates
const { authCheck } = require("../middlewares/auth");
//controllers
const { userCart } = require("../controllers/user");

router.post("/Cart", authCheck, userCart); //save cart

// router.get("/user", (req, res) => {
//   res.json({
//     data: "hey you hit user API endpoint",
//   });
// });

module.exports = router;
