const express = require("express");

const router = express.Router();

//middlewares
const { verifyToken, isAdmin } = require("../middlewares/auth");

//import
const { create, read, update, remove, list } = require("../controllers/sub");

//routes
router.post("/sub", verifyToken, isAdmin, create);
router.get("/subs", list);
// router.get('/category/:slug', authCheck, adminCheck, read);
router.get("/sub/:slug", read);
router.put("/sub/:slug", verifyToken, isAdmin, update);
router.delete("/sub/:slug", verifyToken, isAdmin, remove);

module.exports = router;
