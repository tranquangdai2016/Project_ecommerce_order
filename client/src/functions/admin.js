import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const getOrders = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.get(`${process.env.REACT_APP_API}/admin/orders`)
}

export const changeStatus = async (orderId, orderStatus) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, orderStatus },
  )
}
