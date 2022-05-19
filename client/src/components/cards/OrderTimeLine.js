import { Timeline } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { getUserOrders, getOrderHistory } from '../../functions/user'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const OrderTimeLine = ({ order, showStatus }) => {
  const [orderHistory, setOrderHistory] = useState([])
  const history = useHistory()

  const loadHistory = (order) => {
    getOrderHistory(order._id).then((res) => {
      setOrderHistory(res.data)
    })
  }

  const orderPayment = (order) => {
    history.push('/payment/' + order._id)
  }

  const changeState = (status) => {
    let value = ''
    switch (status) {
      case 'Not processed':
        value = 'Đang xử lý'
        break
      case 'Cash On Delivery':
        value = 'Đang xử lý đơn hàng'
        break
      case 'Paid':
        value = 'Khách hàng đã thanh toán'
        break
      case 'Processing':
        value = 'Trung Quốc - Người giửi đang chuẩn bị hàng'
        break
      case 'Dispatched':
        value = 'Trung Quốc - Lấy hàng thành công'
        break
      case 'Cancelled':
        value = 'Trung Quốc - Đơn hàng đã đến kho Thẩm Quyền'
        break
      case 'Completed':
        value = 'Đơn hàng đang được vận chuyển từ Trung Quốc về Việt Nam'
        break
      case 'Completed':
        value = 'Đơn hàng đã về tới đơn vị order'
        break
      case 'Completed':
        value = 'Mời bạn đến kho để nhận hàng'
        break
      case 'Completed':
        value = 'Đơn hàng đã được giao thành công'
        break
      case 'Completed':
        value = 'Đơn hàng đã bị hủy'
        break

      default:
        value = status
        break
        return value
    }

    return value
  }

  return (
    <div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={(e) => loadHistory(order)}>
          <b>Chi tiết</b>
        </button>
        {!order.isPaid && order.paymentType == 'banking' && (
          <button className="btn btn-primary ml-4" onClick={(e) => orderPayment(order)}>
            <b>Thanh toán</b>
          </button>
        )}
      </div>
      <div className="row mt-4">
        <Timeline>
          {orderHistory &&
            orderHistory.length &&
            orderHistory.map((orderHistory) => (
              <Timeline.Item color="green">
                {new Date(orderHistory.createdAt).toLocaleString()} -{' '}
                <b>{orderHistory.updateBy.username}</b> - Trạng thái: -{' '}
                <b>{changeState(orderHistory.orderStatus)}</b>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>
  )
}

export default OrderTimeLine
