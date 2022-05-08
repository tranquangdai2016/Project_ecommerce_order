import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value)
  // }

  const history = useHistory()

  const handleEmail = async (e) => {
    e.preventDefault()
    try {
      await axios.put('http://localhost:5000/api/auth/forgot-password', { email })

      toast.success('Bạn kiểm tra email đăng kí để nhận lại mật khẩu mới', {
        position: toast.POSITION.TOP_RIGHT,
      })
      history.push('/login')
    } catch (error) {
      console.log('error', error.response)
    }
  }

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4 className="text-danger">loading</h4> : <h4>Forgot password</h4>}
      <form>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <br />
        <button onClick={handleEmail} className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
