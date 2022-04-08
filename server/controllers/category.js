const Category = require('../models/category');
const Product = require ('../models/product')
const Sub = require('../models/sub');
const slugify = require('../models/slugify');

exports.read =  async (req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    const products = await Product.find({category}).populate('category').exec()

    res.json({
        category,
        products,
    })
}