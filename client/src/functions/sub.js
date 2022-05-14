import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const getSubs = async () => await axios.get(`${process.env.REACT_APP_API}/subs`)

export const getSub = async (slug) => await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const removeSub = async (authtoken, slug) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`)
}


export const updateSub = async (authtoken, slug, sub) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub)
}

export const createSub = async (sub) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  return axios.post(`${process.env.REACT_APP_API}/sub`, sub, {})
}
