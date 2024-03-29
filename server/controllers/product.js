const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
const SaveImage = require("../helps/saveimage");
const { aggregate } = require("../models/product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    if (req.body.images) {
      const imagePath = SaveImage.SaveImage(req.body.images);
      req.body.images = imagePath;
    }

    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    //res.status(400).send ("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};
exports.listAll = async (req, res) => {
  //tú code
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(products);
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};
exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROE ---->", err);
    // return res.status(400).send('Product update failed')
    res.status(400).json({
      err: err.message,
    });
  }
};

// exports.list = async (req,res) => {
//     try {
//         //createdAt/ updatedAt, desc/asc,3
//         const {sort,order,limit} = req.body
//         const products = await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort ([[sort,order]])
//         .limit(limit)
//         .exec();

//         res.json(products);
//     } catch (err) {
//         console.log(err);
//     }
// };

//WITH PAGINATION
exports.list = async (req, res) => {
  console.log(req.body);
  try {
    //createdAt/ updatedAt, desc/asc,3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    console.log(products);
    res.status(200).send(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({
    email: req.user.email,
  }).exec();
  const { star } = req.body;

  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: {
          ratings: {
            star,
            postedBy: user._id,
          },
        },
      },
      {
        new: true,
      }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: {
          $elemMatch: existingRatingObject,
        },
      },
      {
        $set: {
          "ratings.$.star": star,
        },
      },
      {
        new: true,
      }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await related
    .find({
      _id: { $ne: product._id },
      category: product.category,
    })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy")
    .exec();

  res.json(related);
};

// search

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({
      category,
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleStar = async (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$rating.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
};

const handleSub = async (req, res, sub) => {
  let products = await Product.find({ subs: sub })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  let products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleColor = async (req, res, color) => {
  let products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  let products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleSize = async (req, res, size) => {
  let products = await Product.find({ size })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleLink = async (req, res, size) => {
  let products = await Product.find({ size })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

exports.searchFilters = async (req, res) => {
  let serverQuery = {};
  const {
    query,
    price,
    category,
    stars,
    sub,
    shipping,
    color,
    brand,
    size,
    link,
  } = req.body;
  console.log(req.body);
  if (query) {
    Object.assign(serverQuery, { $text: { $search: query } });
  }

  if (price !== undefined) {
    Object.assign(serverQuery, {
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    });
  }

  if (category) {
    Object.assign(serverQuery, { category });
  }

  // if (stars) {
  //   Object.assign(serverQuery, {category});
  //   await handleStar(req, res, stars);
  // }

  if (sub) {
    Object.assign(serverQuery, { subs: sub });
  }

  if (shipping) {
    Object.assign(serverQuery, { shipping });
  }

  if (color) {
    Object.assign(serverQuery, { color });
  }

  if (brand) {
    Object.assign(serverQuery, { brand });
    // await handleBrand(brand);
  }
  if (size) {
    Object.assign(serverQuery, { size });
  }
  if (link) {
    Object.assign(serverQuery, { link });
  }
  console.log(serverQuery);
  const products = await Product.find(serverQuery)
    .populate("category", "_id name")
    .populate("subs", "_id name")
    // .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};
