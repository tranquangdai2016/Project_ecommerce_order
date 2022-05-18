import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const getCoupons = async () => await axios.get(`${process.env.REACT_APP_API}/coupons`)

export const removeCoupon = async (couponId, authtoken) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`)
}

export const createCoupon = async (coupon, authtoken) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon }
  )
}
