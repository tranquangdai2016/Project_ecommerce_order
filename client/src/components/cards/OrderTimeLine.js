import { Timeline } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { getUserOrders, getOrderHistory } from '../../functions/user'
import React, { useState, useEffect } from 'react'

const OrderTimeLine = ({ order, showStatus }) => {
  const [history, setHistory] = useState([])

  const loadHistory = (order) => {
    getOrderHistory(order._id).then((res) => {
      setHistory(res.data)
    })
  }

  const changeState = (status) => {
    let value = ''
    switch (status) {
      case 'Not processed':
        value = 'Đang xử lý'
        break
      case 'Cash On Delivery':
        value = 'Thanh toán khi giao hàng'
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
      <div className="row">
        <button className="btn btn-primary" onClick={(e) => loadHistory(order)}>
          <b>Chi tiết</b>
        </button>
      </div>
      <div className="row mt-4">
        <Timeline>
          {history &&
            history.length &&
            history.map((history) => (
              <Timeline.Item color="green">
                {new Date(history.createdAt).toLocaleString()} - <b>{history.updateBy.username}</b>{' '}
                - Trạng thái: - <b>{changeState(history.orderStatus)}</b>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>
  )
}

export default OrderTimeLine
