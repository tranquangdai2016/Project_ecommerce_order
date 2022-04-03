const express = require('express');

const router = express.Router();

//middlewares
const {authCheck, adminCheck} = require ('../middlewares/auth')

//import
const { create} = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);



module.exports = router;