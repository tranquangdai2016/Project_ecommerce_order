import React from 'react'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShowPaymentInfo from '../cards/ShowPaymentInfo'

const Orders = ({ orders, handleStatusChange, handleTranferCodeChange, updateTranferCode }) => {
  const showOrderInTable = (order) => (
    console.log('order', order),
    (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Size</th>
            <th scope="col">Count</th>
            <th scope="col">Link sản phẩm</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td>
                <b>{p.product.title}</b>
              </td>
              <td>{p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.product.size}</td>
              <td>{p.count}</td>
              <td>{p.product.link}</td>
              <td>
                {p.product.shipping === 'Yes' ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  )

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />
            <div class="row">
              <div class="col-md-4">Trạng thái đơn hàng</div>
              <div class="col-md-8">
                <select
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Đang xử lý</option>
                  <option value="Cash on Delivery">Thanh toán khi giao hàng</option>
                  <option value="Processing">Trung Quốc - Người giửi đang chuẩn bị hàng</option>
                  <option value="Dispatched">Trung Quốc - Lấy hàng thành công</option>
                  <option value="Cancelled">Trung Quốc - Đơn hàng đã đến kho Thẩm Quyền</option>
                  <option value="Completed">
                    Đơn hàng đang được vận chuyển từ Trung Quốc về Việt Nam
                  </option>
                  <option value="Completed">Đơn hàng đã về tới đơn vị order</option>
                  <option value="Completed">Mời bạn đến kho để nhận hàng</option>
                  <option value="Completed">Đơn hàng đã được giao thành công</option>
                  <option value="Completed">Đơn hàng đã bị hủy</option>
                </select>
              </div>
            </div>
            <div class="row  mt-2">
              <div class="col-md-2">Mã vận đơn</div>
              <div class="col-md-3">
                <b>{order.transportCode}</b>
              </div>
              <div class="col-md-3">
                <input
                  class="form-control"
                  // value={order.transportCode}
                  onChange={(e) => handleTranferCodeChange(order, e.target.value)}
                ></input>
              </div>
              <div class="col-md-4">
                <button
                  class="btn btn-primary"
                  onClick={(e) => updateTranferCode(order._id, order.transportCode)}
                >
                  Cập nhật mã vận đơn
                </button>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  )
}

export default Orders
