const express = require("express");

const router = express.Router();

//middlewares
const { isAdmin, verifyToken } = require("../middlewares/auth");

//import
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require("../controllers/category");

//routes
router.post("/category", isAdmin, verifyToken, create);
router.get("/categories", list);
// router.get('/category/:slug', authCheck, adminCheck, read);
router.get("/category/:slug", read);
router.put("/category/:slug", isAdmin, verifyToken, update);
router.delete("/category/:slug", isAdmin, verifyToken, remove);
router.get("/category/subs/:_id", getSubs);

module.exports = router;