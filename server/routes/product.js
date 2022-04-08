const express = require('express')
const routes = express.Router()

//middlewares
const {
    authCheck,
    adminCheck
} = require('../middlewares/auth');

// controllers
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productCount,
    productStar,
    listRelated,
} = require('../controllers/product');

//router

//rating
router.put('/product/star/:productId', authCheck, productStar)

//related
router.get("/product/related/:productId", listRelated);

module.exports = router;