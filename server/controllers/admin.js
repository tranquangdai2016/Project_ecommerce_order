const Order = require('../models/order')
const OrderHistory = require('../models/orderHistory')
const User = require('../models/user');

exports.orders = async (req, res) => {
    let allOrders = await Order
    .find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec()

    res.json(allOrders);
};

exports.orderStatus= async (req, res) => {
    const {orderId, orderStatus} = req.body;

    let updated = await Order
    .findByIdAndUpdate(orderId, {orderStatus}, {new: true})
    .exec()
    
    let orderHistory = await new OrderHistory({
        orderId: orderId,
        updateBy: req.user._id,
        orderStatus: orderStatus,
    }).save();

    res.json(updated)
}

exports.tranferCode = async (req, res) => {
    const {orderId, transportCode} = req.body;

    let updated = await Order
    .findByIdAndUpdate(orderId, {transportCode}, {new: true})
    .exec()
    
    res.json(updated)
}