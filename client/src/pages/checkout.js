import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
  getUserAddress,
} from '../functions/user'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Radio, Input, Space, Card } from 'antd'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// import { set } from 'lodash'

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([])
  const [addresses, setAddressess] = useState([])
  const [total, setTotal] = useState(0)
  const [addAddress, setAddAddress] = useState(false)
  const [address, setAddress] = useState('')
  const [addcity, setAddcity] = useState('')
  const [adddistrict, setAdddistrict] = useState('')
  const [addwards, setAddwards] = useState('')
  const [addressId, setAddressId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentType, setPaymentType] = useState('cod')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  //discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  const dispatch = useDispatch()

  const { user, COD } = useSelector((state) => ({ ...state }))
  const couponTrueOrFalse = useSelector((state) => state.coupon)

  useEffect(() => {
    console.log(user)
    setName(user.user.username)
  }, [user])

  useEffect(() => {
    getUserCart().then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
    }, [])
    getUserAddress().then((res) => {
      setAddressess(res.data)
    }, [])
  }, [])

  const emptyCart = () => {
    //remove from local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
    //remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    })
    //remove from backend
    emptyUserCart(user.token).then((res) => {
      {
        setProducts([])
        setTotal(0)
        setTotalAfterDiscount(0)
        setCoupon('')
        toast.success('Giỏ hàng của bạn đang trống')
      }
    })
  }

  const saveAddressToDb = () => {
    console.log(address)
    let payload = {
      name: name,
      address: address,
      addcity: addcity,
      adddistrict: adddistrict,
      addwards: addwards,
      phone: phone,
    }
    saveUserAddress(payload).then((res) => {
      if (res.data.ok) {
        console.log('ok', res.data.ok)
        setAddressSaved(true)
        setAddAddress(false)
        toast.success('Thêm địa chỉ thành công')
      }
    })
  }

  const addAddressVisible = () => {
    setAddAddress(true)
  }

  const cancelAddAddress = () => {
    setAddress('')
    setAddcity('')
    setAdddistrict('')
    setAddwards('')
    setPhone('')
    setName(user.user.username)
    setAddAddress(false)
  }

  const applyDiscountCoupon = () => {
    // console.log('send coupon to backend', coupon)

    applyCoupon(coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data)
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        })
      }
      //error
      if (res.data.err) {
        setCoupon('')
        setDiscountError(res.data.err)
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
      }
    })
  }

  const showAddAddress = () => (
    <>
      <label>Tên khách hàng</label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Số điện thoại</label>
      <input
        type="text"
        className="form-control"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label>Tỉnh/Thành Phố</label>
      <input
        type="text"
        className="form-control"
        value={addcity}
        onChange={(e) => setAddcity(e.target.value)}
      />
      <label>Quận/Huyện</label>
      <input
        type="text"
        className="form-control"
        value={adddistrict}
        onChange={(e) => setAdddistrict(e.target.value)}
      />
      <label>Phường/Xã</label>
      <input
        type="text"
        className="form-control"
        value={addwards}
        onChange={(e) => setAddwards(e.target.value)}
      />
      <label>Địa chỉ nhận hàng</label>
      <input
        type="text"
        className="form-control"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mt-2 mr-2" onClick={saveAddressToDb}>
          Lưu địa chỉ
        </button>
        <button className="btn btn-danger mt-2" onClick={cancelAddAddress}>
          Hủy
        </button>
      </div>
    </>
  )

  const showAddress = () => (
    <>
      <Radio.Group onChange={(e) => setAddressId(e.target.value)} value={addressId}>
        <Space direction="vertical">
          {addresses.map((p, i) => (
            <Radio value={p._id} key={i}>
              <p>
                <h5>{p.name}</h5>
                <div>
                  {p.receiveAddress} - {p.phone}
                </div>
              </p>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <br />
      <div className="d-flex justify-content-center">
        <Button type="primary" shape="dashed" icon={<PlusOutlined />} onClick={addAddressVisible}>
          Thêm
        </Button>
      </div>
    </>
  )

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count}
        </p>
      </div>
    ))
  }

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value)
          setDiscountError('')
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <div className="d-flex justify-content-center">
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          Áp dụng
        </button>
      </div>
    </>
  )

  const createCashOrder = () => {
    if (addressId == '') {
      toast.error('Bạn chưa chọn địa chỉ')
      return
    }
    createCashOrderForUser(paymentType, coupon, addressId).then((res) => {
      // console.log('user cash order created res', res)
      // emty cart form redux, local storage, reset coupon / cod, redirect
      if (res.data.ok) {
        //EMPTY LOCAL STORAGE
        if (typeof window !== 'undefined') localStorage.removeItem('cart')
        // empty redux cart
        dispatch({
          type: 'ADD_TO_CART',
          payload: [],
        })
        // empty redux coupon
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
        // empty redux cod
        dispatch({
          type: 'COD',
          payload: false,
        })
        // empty cart from backend
        emptyUserCart(user.token)
        // redirect
        setTimeout(() => {
          history.push('user/history')
        }, 1000)
      }
    })
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-6">
          <h4>Địa chỉ nhận hàng</h4>
          <br />
          {!addAddress && showAddress()}
          {addAddress && showAddAddress()}
          <hr />
          <h4>Hình thức thánh toán</h4>
          <br />
          <Radio.Group
            name="paymentType"
            className="w-100"
            defaultValue={'cod'}
            onChange={(e) => {
              console.log(e)
              setPaymentType(e.target.value)
            }}
          >
            <Space direction="vertical" className="w-100">
              <Radio value={'cod'}>Thanh toán khi nhận hàng</Radio>
              <Radio value={'banking'}>Chuyển khoản</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="col-md-6">
          <h4>Đơn hàng</h4>
          <br />
          <p>Sản phẩm {products.length}</p>
          <hr />
          {showProductSummary()}
          <hr />
          {showApplyCoupon()}
          <br />
          <h4>Mã giảm giá?</h4>
          {discountError && <p className="bg-danger p2">{discountError}</p>}
          <hr />
          <p>
            <b>Tổng: {total}</b>
          </p>
          {totalAfterDiscount != 0 && (
            <p className="p2">
              <b>Số tiền thanh toán: ${totalAfterDiscount}</b>
            </p>
          )}
          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                disabled={!products.length}
                onClick={createCashOrder}
              >
                Đặt hàng
              </button>

              {/* {COD ? (
                <button
                  className="btn btn-primary"
                  disabled={!products.length}
                  onClick={createCashOrder}
                >
                  Đặt hàng
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!products.length}
                  onClick={() => history.push('/payment')}
                >
                  Đặt hàng
                </button>
              )} */}
            </div>

            <div className="col-md-6">
              <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary">
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
