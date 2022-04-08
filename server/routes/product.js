const express = require("express");
const router = express.Router();

//middlewates
const { authCheck, adminCheck } = require("../middlewares/auth");
// controleer
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  searchFilters,
} = require("../controllers/product");

// routers
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); //product //100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);

//search
router.post("/search/filters", searchFilters);


module.exports = router;
