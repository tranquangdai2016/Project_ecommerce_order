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
                {new Date(history.createdAt).toLocaleString()} -{' '}
                <b>{history.updateBy.username}</b> - Trạng thái: - <b>{history.orderStatus}</b>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>
  )
}

export default OrderTimeLine
