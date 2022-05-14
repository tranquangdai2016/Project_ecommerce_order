import axios from "axios";
import setAuthToken from '../utils/setAuthToken';

export const getCategories = async () =>{
  return axios.get(`${process.env.REACT_APP_API}/categories`);
}
  

export const getCategory = async (slug) =>{
  return axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
}
  

export const removeCategory = async (authtoken, slug) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.delete(`${process.env.REACT_APP_API}/category/${slug}`);
}

export const updateCategory = async (slug, category) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category);
}

export const createCategory = async (category) =>{
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return axios.post(`${process.env.REACT_APP_API}/category`, category);
}

export const getCategorySubs = async (_id) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
}
  
