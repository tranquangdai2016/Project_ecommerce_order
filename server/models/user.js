const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"');
            }
        },
        // tokens: [
        //     {
        //         type: string,
        //         required: true,
        //     }
        // ]
    },
    role: {
        type: String,
        default: "subscriber",

    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    wishlist: [{type: ObjectId, ref: "Product" }],
}, 
{ timestamps: true }
);
module.exports = mongoose.model("User", userSchema);