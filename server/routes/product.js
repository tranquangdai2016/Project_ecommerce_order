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
<<<<<<< HEAD
  searchFilters,
=======
  productStar,
  listRelated,
>>>>>>> b9208f162dbc921cb411327f2d5c7fe35186aac7
} = require("../controllers/product");

// routers
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); //product //100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);

<<<<<<< HEAD
//search
router.post("/search/filters", searchFilters);

=======
//rating
router.put('/product/star/:productId', authCheck, productStar)

//related
router.get("/product/related/:productId", listRelated);
>>>>>>> b9208f162dbc921cb411327f2d5c7fe35186aac7

module.exports = router;
