const Order = require("../models/order");
const OrderHistory = require("../models/orderHistory");
const User = require("../models/user");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  let orderHistory = await new OrderHistory({
    orderId: orderId,
    updateBy: req.user._id,
    orderStatus: orderStatus,
  }).save();

  res.json(updated);
};

exports.tranferCode = async (req, res) => {
  const { orderId, transportCode } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { transportCode },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.listUser = async (req, res) => {
  let page = req.query.page;

  const page_size = 10;

  if (page) {
    page = parseInt(page);
    if (page < 1) {
      page = 1;
    }

    const qtyShip = (page - 1) * page_size;

    User.find({})
      .sort({ _id: -1 })
      .skip(qtyShip)
      .limit(page_size)
      .exec((err, user) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Không tìm thấy người dùng nào",
          });
        }

        User.countDocuments({}).then((total) => {
          const totalPage = Math.ceil(total / page_size);

          res.status(200).json({
            success: true,
            message: "Lấy tất cả danh sách đơn đặt hàng thành công",
            user,
            totalPage,
          });
        });
      });
  } else {
    User.find({}).exec((err, user) => {
      if (err || !user) {
        return res.status(401).json({
          success: false,
          message: "Không tìm thấy người dùng nào",
        });
      }

      res.status(200).json({
        success: true,
        message: "Lấy danh sách người dùng thành công",
        user,
      });
    });
  }
};
