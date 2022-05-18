import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import { getOrders, changeStatus, changeTranferCode } from '../../functions/admin'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Orders from '../../components/order/Orders'
import { getDataLocalstorage } from '../../functions/user'

const AdminDashboard = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadOrders()
  }, [])

  //   const loadOrders = () => console.log('user', loadOrders)
  //   getDataLocalstorage(user.token).then((res) => {
  //     console.log(JSON.stringify(res.data, null, 4))
  //     setOrders(res.data)
  //   })
  const loadOrders = () =>
    getOrders().then((res) => {
      setOrders(res.data)
    })

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus).then((res) => {
      toast.success('Status Updated')
      loadOrders()
    })
  }

  const handleTranferCodeChange = (order, transportCode) => {
    order.transportCode = transportCode
    console.log(order)
    console.log(transportCode)
  }

  const updateTranferCode = (orderId, transportCode) => {
    console.log(orderId, transportCode)
    changeTranferCode(orderId, transportCode).then((res) => {
      toast.success('TranferCode Updated')
      loadOrders()
    })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders
            orders={orders && orders}
            handleStatusChange={handleStatusChange}
            handleTranferCodeChange={handleTranferCodeChange}
            updateTranferCode={updateTranferCode}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
