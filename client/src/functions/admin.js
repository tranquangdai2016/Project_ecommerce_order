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
  return axios.put(`${process.env.REACT_APP_API}/admin/order-status`, { orderId, orderStatus })
}

export const changeTranferCode = async (orderId, transportCode) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.put(`${process.env.REACT_APP_API}/admin/tranfer-code`, {
    orderId,
    transportCode: transportCode,
  })
}

export const getListUser = async (userId) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.get(`${process.env.REACT_APP_API}/admin/list-user`, { userId })
}
