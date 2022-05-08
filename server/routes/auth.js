const express = require("express");
const router = express.Router();

const { register, login, forgotPassword } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

router.put("/forgot-password", forgotPassword);

module.exports = router;