const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require ('../middlewares/auth')

//controllers

//wishlist 
router.post('/user/wishlist',authCheck, addToWishlist);
router.get('/user/wishlist',authCheck, wishlist);
router.put('/user/wishlist/:productId',authCheck, removeFromWishlist);

// router.get("/user", (req, res) => {
//     res.json({
//         data: "hey you hit user API endpoint",
//     });
// });

module.exports = router;