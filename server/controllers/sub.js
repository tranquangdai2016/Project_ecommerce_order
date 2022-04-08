const Sub = require('../models/sub');
const slugify = require('slugify');
const Product = require ('../models/product')

exports.read = async (req, res) => {
    let sub = await Sub.findOne({ slug: req.params.slug}).exec();
    const products = await Product.find({subs: sub}).populate('category').exec()

    res.json({
        sub,
        products,
    });
}