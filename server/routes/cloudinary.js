const express = require("express");

const router = express.Router();
//middlewares
const {
    verifyToken,
    isAdmin
} = require('../middlewares/auth');

//controllers
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", verifyToken, isAdmin, upload);
router.delete("/removeimage", verifyToken, isAdmin, remove);

module.exports = router;
