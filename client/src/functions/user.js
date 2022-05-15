import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const userCart = async (cart, authtoken) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart })
}

export const getUserCart = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.get(`${process.env.REACT_APP_API}/user/cart`)
}

export const emptyUserCart = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.delete(`${process.env.REACT_APP_API}/user/cart`)
}

export const saveUserAddress = async (address) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.post(`${process.env.REACT_APP_API}/user/address`, address)
}

export const getUserAddress = async (address) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.get(`${process.env.REACT_APP_API}/user/address`, { address })
}

export const applyCoupon = async (coupon) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon }
  )
}


export const createOrder = async (stripeResponse, addressId) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse, addressId }
  )
}


export const createCashOrderForUser = async (COD, couponTrueOrFalse, addressId) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD, addressId },
  )
}

export const getUserOrders = async () =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.get(`${process.env.REACT_APP_API}/user/orders`)
}

export const getOrderHistory = async (orderId) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return axios.post(`${process.env.REACT_APP_API}/user/order-history`, {orderId})
}


export const getWishlist = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.get(`${process.env.REACT_APP_API}/user/wishlist`)
}

export const removeWishlist = async (productId) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.put(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId }
  )
}

export const addToWishlist = async (productId) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId }
  )
}

export const getDataLocalstorage = () => {
  const getDataLocalstorage = localStorage.getItem('users')
  if (getDataLocalstorage) {
    return JSON.parse(getDataLocalstorage)
  } else {
    return false
  }
}
