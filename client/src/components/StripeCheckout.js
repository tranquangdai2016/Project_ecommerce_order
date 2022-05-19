import React, { useEffect, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import { createPaymentIntent } from '../functions/stripe'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { DollarOutlined, CheckOutlined } from '@ant-design/icons'
import Laptop from '../images/laptop.png'
import BankingImage from '../images/Banking.svg'
import { createOrder, emptyUserCart, getOrder, payment } from '../functions/user'
import ImageUploader from 'react-images-upload'
import GetBase64 from '../utils/getbase64'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";

const StripeCheckout = ({orderId }) => {
  const dispatch = useDispatch()
  const { user, coupon } = useSelector((state) => ({ ...state }))
  const history = useHistory();
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [image, setImage] = useState('')
  const [order, setOrder] = useState({})
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [payable, setPayable] = useState(0)

  const stripe = useStripe()
  const elements = useElements()
  useEffect(() => {
    getOrder(orderId).then((res) => {
      setOrder(res.data)
    })
  }, [])

  const onDrop = (thumbnail) => {
    setTimeout(async () => {
      if (thumbnail && thumbnail[0]) {
        const base64 = await GetBase64(thumbnail[0])
        setImage(base64)
      } else {
        setImage('')
      }
    }, 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    if (!image && image == '') {
      toast.error('Bạn chưa tải ảnh lên')
      return
    }

    payment(orderId, image)
    .then((res) => {
      if (res) {
        console.log(res)
        // window.alert(`"${res.data.title}" is created `)
        toast.success(res.data.title, 'Thành công, Admin sẽ kiếm tra và cập nhật thông tin đơn hàng', {
          position: toast.POSITION.TOP_RIGHT,
        })
        history.push("/user/history")
      }
    })
    .catch((err) => {
      console.log(err)
      // if (err.response.status === 400) toast.error(err.response.data);
      toast.error(err.response.data.err)
    })
  }


  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <Card
          cover={
            <img
              src={BankingImage}
              style={{
                height: '400px',
                objectFit: 'contain',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <CheckOutlined className="text-info" /> <br /> Tổng số tiền : $
              {order.paymentIntent && order.paymentIntent.amount.toFixed(2)}
            </>,
          ]}
        />
      </div>
      <div className="col-lg-6">
        <div className="text-center pb-5">
          <h4>Thông tin tài khoản</h4>
          <div>
            <h3>123456789</h3>
          </div>
          <div>
            <b>Nguyễn Văn Long-Techcombank</b>
          </div>
          <div className="mt-2">
            Số tiền: <b>{order.paymentIntent && order.paymentIntent.amount}</b>
          </div>
          <div className="mt-2">
            Nội dung chuyển khoản: <b>Thanh toán đơn hàng: {order && order._id}</b>
          </div>
          <ImageUploader
            withIcon={false}
            singleImage={true}
            withPreview={true}
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
          />
        </div>
        <button className="stripe-button" onClick={handleSubmit}>
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : 'Đã chuyển khoản'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default StripeCheckout
