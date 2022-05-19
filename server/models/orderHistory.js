const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderHistorySchema = new mongoose.Schema(
  {
    orderStatus: {
      type: String,
      default: "Not processed",
      // enum: [
      //   "Không được xử lý",
      //   "Thanh toán khi giao hàng",
      //   "[Trung Quốc]Người giửi đang chuẩn bị hàng",
      //   "[Trung Quốc]Lấy hàng thành công",
      //   "[Trung Quốc]Đơn hàng đã đến kho Thẩm Quyền",
      //   "Đơn hàng đang được vận chuyển từ Trung Quốc về Việt Nam",
      //   "Đơn hàng đã về tới đơn vị order",
      //   "Mời bạn đến kho để nhận hàng",
      //   "Đơn hàng đã được giao thành công",
      //   "Đơn hàng đã bị hủy",
      // ],
      enum: [
        "Not processed",
        "Cash On Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
        "Paid",
      ],
    },
    updateBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: ObjectId,
      ref: "Order",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
