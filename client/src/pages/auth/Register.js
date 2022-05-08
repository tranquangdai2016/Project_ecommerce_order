import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const history = useHistory()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data)
      toast.success(
        `Email is send to ${data.email}. Click the links to complette your registration`,
      )
      history.push('/login')
    } catch (error) {
      console.log('error', error.response.data)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="form-control"
                {...register('username', { required: true })}
                placeholder="your username"
                autoFocus
              />
              {errors.username && <span className="text-danger">username is required</span>}
              <input
                type="email"
                className="form-control"
                {...register('email', { required: true })}
                placeholder="your email"
              />
              {errors.email && <span className="text-danger">email is required</span>}
              <input
                type="password"
                className="form-control"
                {...register('password', { required: true })}
                placeholder="your password"
              />
              {errors.password && <span className="text-danger">password is required</span>}
              <input
                type="text"
                className="form-control"
                {...register('phone', { required: true })}
                placeholder="your phone"
              />
              {errors.phone && <span className="text-danger">phone is required</span>}
              <br />
              <button type="submit" className="btn btn-raised">
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
