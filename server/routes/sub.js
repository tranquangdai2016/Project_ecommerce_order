const express = require("express");

const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//import
const { create, read, update, remove, list } = require("../controllers/sub");

//routes
router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
// router.get('/category/:slug', authCheck, adminCheck, read);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
