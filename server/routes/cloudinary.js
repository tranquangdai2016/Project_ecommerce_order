const express = require('express');

const router = express.Router();
//middlewares
const {authCheck, adminCheck} = require ('../middlewares/auth');
const {upload, remove} = require ('../controllers/cloudinary');
router.post("/uploadimages", authCheck , adminCheck , upload);
router.post("/removeimages", adminCheck, adminCheck , remove);
module.exports= router;
