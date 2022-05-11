import axios from "axios";

import setAuthToken from '../utils/setAuthToken';
export const createProduct = async (product) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.post(`${process.env.REACT_APP_API}/product`, product)
};

export const getProductsByCount = async (count) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}


export const removeProduct = async (slug) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`);
}

export const getProduct = async (slug) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}


export const updateProduct = async (slug, product) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product);
}


export const getProducts = async (sort, order, page) => {
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });
}

export const getProductsCount = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  await axios.get(`${process.env.REACT_APP_API}/products/total`);
}


export const productStar = async (productId, star) => {
  await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, { star })
}


export const getRelated = async (productId) => {
  await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
}


export const fetchProductsByFilter = async (arg) => {
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
}
