const express = require("express");
const router = express.Router();

//middlewates
const {
  verifyToken,
  isAdmin
} = require('../middlewares/auth');
// controleer
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require("../controllers/product");

// routers
router.post("/product", verifyToken, isAdmin, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); //product //100
router.delete("/product/:slug", verifyToken, isAdmin, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", verifyToken, isAdmin, update);

router.post("/products", list);

//rating
router.put('/product/star/:productId', verifyToken, productStar)

//related
router.get("/product/related/:productId", listRelated);

//search
router.post("/search/filters", searchFilters);


module.exports = router;
