const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const orderHistorySchema = new mongoose.Schema({
    orderStatus: {
        type: String,
        default: 'Not processed',
        enum: [
            "Not processed",
            "Cash On Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Completed",
        ]
    },
    updateBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: ObjectId,
        ref: "Order",
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('OrderHistory', orderHistorySchema );