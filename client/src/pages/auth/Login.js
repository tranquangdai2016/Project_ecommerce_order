import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { getDataLocalstorage } from '../../functions/user'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const history = useHistory()

  const [loading, setLoading] = useState(false)

  const saveUserLocalstorage = (data) => {
    localStorage.setItem('users', JSON.stringify(data))
  }

  const saveTokenLocalstorage = (data) => {
    localStorage.setItem('token', data)
  }

  useEffect(() => {
    getDataLocalstorage() && history.push('/')
  }, [])

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data)
      console.log('res', res)
      toast.success(`Đăng nhập thành công`)
      const dataUser = {
        token: res.data.token,
        user: res.data.user,
      }
      await saveUserLocalstorage(dataUser)
      await saveTokenLocalstorage(res.data.token)
      history.push('/')
    } catch (error) {
      console.log('error', error.response.data.message)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        className="form-control"
        {...register('email', { required: true })}
        placeholder="your email"
        autoFocus
      />
      {errors.email && <span className="text-danger">email is required</span>}
      <input
        type="password"
        className="form-control"
        {...register('password', { required: true })}
        placeholder="your password"
      />
      {errors.password && <span className="text-danger">password is required</span>}
      <br />
      <button type="submit" className="btn btn-raised">
        LOGIN
      </button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? <h4 className="text-danger">loading...</h4> : <h4>Login</h4>}

          {loginForm()}

          <Link to="forgot/password" className="text-danger" style={{ marginLeft: 'auto' }}>
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
