const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const product = require("../models/product");
const Coupon = require("../models/coupon");
const user = require("../models/user");

exports.userCart = async (red, res) => {
    //console.log(req.body); //{cart: []}
    const { cart } = req.body;

let products = [];

const user = await User.findOne({email: req.user.email}).exec();

//check if cart with logged in user id already exits
let cartExistByThisUser = await Cart.findOne({orderBy: user._id}).exec();
if(cartExistByThisUse) {
    cartExistByThisUse.remove();
    console.log("recomment old cart");
}

for (i = 0; i < cart.length; i++) {
    let object = {}

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
    .select("price")
    .exec();
    object.price = productFromDb.price;

    product.push(object);
}

//console.log('product',products);
let cartTotal = 0;

for(i =0 ; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price + products[i].count
}

//console.log('cartTotal',cartTotal);

let newCart = await new Cart({
    products,
    cartTotal,
    order: user._id,
}).save();

console.log("new cart ----->", newCart);
res.json({ ok:true });

};

exports.getUserCart = async (req,res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let cart = await Cart.findOne({ orderBy: user._id})
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount })
}

exports.emptyCart = async (req,res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec;
    res.json(cart);
}

exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate(
        { email: req.user.email },
        { address:req.body.address}
    ).exec();

    res.json({ ok: true })
}

exports.applyCouponToUserCart = async (req,res) => {
    const { coupon } = req.body;
    console.log("COUPON",coupon);

    const validCoupon = await Coupon.findOne({ name:coupon }).exec();
    if (validCoupon === null) {
        return res.json({
            err: "Invalid coupon",
        });
    }
    console.log("VALID COUPON",validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderBy: user._id})
    .populate("products.product","_id title price")
    .exec();

    console.log("cartTotal",cartTal,"discount",validCoupon.discount);

    //caculate the total after discount
    let totalAfterDiscount = (
        cartTotal = 
        (cartTotal * validCoupon.discount)/100
    ).toFixed(2); //99.99

    Cart.findOneAndUpdate(
        { orderBy: user._id}, 
        { totalAfterDiscount }, 
        {new: true}
        );

        res.json(totalAfterDiscount);
};