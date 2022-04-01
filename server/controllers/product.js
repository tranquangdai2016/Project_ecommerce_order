exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec()
    const user = await User.findOne({
        email: req.user.email
    }).exec()
    const {
        star
    } = req.body

    let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString())

    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(product._id, {
            $push: {
                ratings: {
                    star,
                    postedBy: user._id
                }
            },
        }, {
            new: true
        }).exec();
        console.log('ratingAdded', ratingAdded);
        res.json(ratingAdded);
    } else {
        const ratingUpdate = await Product.updateOne({
            ratings: {
                $elemMatch: existingRatingObject
            },
        }, {
            $set: {
                'ratings.$.star': star
            }
        }, {
            new: true
        }).exec();
        console.log('ratingUpdated', ratingUpdated);
        res.json(ratingUpdated);
    }
}