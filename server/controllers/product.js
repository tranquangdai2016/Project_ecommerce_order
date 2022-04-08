const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
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

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

// search / filter

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('sub', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
}

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      }
    })
      .populate('category', '_id name')
      .populate('sub', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);

  } catch (error) {
    console.log(error);
  }
}

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('sub', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);

  } catch (error) {
    console.log(error);
  }
}

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        floorAverage: {
          $floor: { $avg: "$ratings.star" }
        }
      }
    },
    { $match: { floorAverage: stars } }
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err)
        Product.find({ _id: aggregates })
          .populate('category', '_id name')
          .populate('sub', '_id name')
          .populate('postedBy', '_id name')
          .exec((err, products) => {
            if (err)
              res.json(products);
          });
    });
}

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars } = req.body;
  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStar(req, res, stars);
  }
}