const express = require('express');
const router = express.Router();

const { createPaymentIntent } = require('../controllers/stripe');
// const { route } = require('./user')

//middleware

const { verifyToken } = require('../middlewares/auth')

router.post("/create-payment-intent", verifyToken, createPaymentIntent);

module.exports = router;
