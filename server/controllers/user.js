const User = require("../models/user");
const Address = require("../models/address");
const Product = require("../models/product");
const Cart = require("../models/cart");
const product = require("../models/product");
const Coupon = require("../models/coupon");
const Order = require("../models/order")
const OrderHistory = require("../models/orderHistory")
const uniqueid = require("uniqueid");

exports.userCart = async (req, res) => {
    //console.log(req.body); //{cart: []}
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    //check if cart with logged in user id already exits
    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("recomment old cart");
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {}

        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        //get price for creating total
        let productFromDb = await Product.findById(cart[i]._id)
            .select("price")
            .exec();
        object.price = productFromDb.price;

        products.push(object);
    }

    //console.log('product',products);
    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count
    }

    //console.log('cartTotal',cartTotal);

    let newCart = await new Cart({
        products,
        cartTotal,
        orderdBy: user._id,
    }).save();

    console.log("new cart ----->", newCart);
    res.json({ ok: true });

};

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let cart = await Cart.findOne({ orderBy: user._id })
        .populate("products.product", "_id title price totalAfterDiscount")
        .exec();

    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount })
}

exports.emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOneAndRemove({ orderBy: user._id }).exec;
    res.json(cart);
}

exports.saveAddress = async (req, res) => {
    let receiveAddress = req.body.address;
    const { name, phone } = req.body;
    let address = await new Address({
        name,
        receiveAddress,
        phone,
        userId: req.user._id,
    }).save();

    res.json({ ok: true })
};

exports.getAllAddress = async (req, res) => {
    let addresses = await Address.find({userId: req.user._id}).exec();
    res.json(addresses)
};

exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;
    console.log("COUPON", coupon);

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon === null) {
        return res.json({
            err: "Invalid coupon",
        });
    };
    console.log("VALID COUPON", validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderBy: user._id })
        .populate("products.product", "_id title price")
        .exec();

    console.log("cartTotal", cartTal, "discount", validCoupon.discount);

    //caculate the total after discount
    let totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
    ).toFixed(2); //99.99



    Cart.findOneAndUpdate(
        { orderBy: user._id },
        { totalAfterDiscount },
        { new: true }
    ).exec();

    res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
    // console.log(req.body)
    // return;
    const { paymentIntent, addressId } = req.body.stripeResponse
    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        addressId,
        orderdBy: user._id,
    }).save();

    //decrement quantity, increment sold
    let bulkOption = products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });

    let update = await Product.bulkWrite(bulkOption, {});
    console.log('PRODUCT QUANTITY-- AND SOLD++', update)

    //product.bulkWrite({})

    console.log('NEW ORDER SAVED', newOrder);
    res.json({ ok: true });
};

exports.orders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).exec();

    let userOrders = await  Order.find({ orderdBy: user._id })
        .populate("products.product")
        .exec();
    res.json(userOrders);
};

exports.orderHistory = async (req, res) => {
    let history = await OrderHistory.find({ orderId: req.body.orderId }).populate('updateBy').exec();

    res.json(history);
};
// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
  
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } }
    ).exec();
  
    res.json({ ok: true });
  };
  
  exports.wishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist")
      .exec();
  
    res.json(list);
  };
  
  exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $pull: { wishlist: productId } }
    ).exec();
  
    res.json({ ok: true });
  };
  

exports.createCashOrder = async (req, res) => {
    const { COD, couponApplied, addressId } = req.body;

    //if cod true, create order with status of cash on delivery
    if (!COD) return res.status(400).send("Create cash order failed");

    const user = await User.findOne({ email: req.user.email }).exec();

    let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

    let finalAmount = 0;

    if( couponApplied && userCart.totalAfterDiscount ) {
        finalAmount = userCart.totalAfterDiscount * 100 ;
    } else {
        finalAmount = userCart.cartTotal * 100;
    }

    let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
            id: uniqueid(),
            amount: finalAmount,
            currency: "usd",
            status: "Cash On Delivery",
            created: Date.now(),
            payment_method_types: ['cash']
        },
        orderdBy: user._id,
        addressId: addressId,
        status: "Cash On Delivery",
    }).save();

    //decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });

    let updated = await Product.bulkWrite(bulkOption, {});
    console.log('PRODUCT QUANTITY-- AND SOLD++', updated)

    //product.bulkWrite({})

    let orderHistory = await new OrderHistory({
        orderId: newOrder._id,
        updateBy: user._id,
        orderStatus: "Cash On Delivery",
    }).save();
    
    console.log('NEW ORDER SAVED', newOrder);
    res.json({ ok: true });
}



