import axios from "axios";
import setAuthToken from '../utils/setAuthToken';
export const createProduct = async (product) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return await axios.post(`${process.env.REACT_APP_API}/product`, product)
};

export const getProductsByCount = async (count) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}


export const removeProduct = async (slug) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.delete(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const getProduct = async (slug) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}


export const updateProduct = async (slug, product) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product);
}


export const getProducts = async (sort, order, page) => {
  return axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
}

export const getProductsCount = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
}


export const productStar = async (productId, star) => {
  return await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, { star })
}


export const getRelated = async (productId) => {
  return axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
}


export const fetchProductsByFilter = async (arg) => {
  return axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
}
