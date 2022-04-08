const express = require('express')
const router = express.Router()

//middlewares
const {
    authCheck,
    adminCheck
} = require('../middlewares/auth');

// controllers
const {
    create,
    read,
    update,
    remove,
    list,
    getSubs,
} = require('../controllers/category')

//router

module.exports = router;