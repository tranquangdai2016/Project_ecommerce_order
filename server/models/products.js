const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    ratings: [
        {
        star: Number,
        postedBy: {type: ObjectId, ref: "User"},
        },
    ],
},
{ timestamps: true}
)

module.exports = mongoose.model('Product', productSchema);