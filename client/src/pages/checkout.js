import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from '../functions/user'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [addressSaved, setAddressSaved] = useState(false)
  const [coupon, setCoupon] = useState('')
  //discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  const dispatch = useDispatch()
  const { user, COD } = useSelector((state) => ({ ...state }))
  const couponTrueOrFalse = useSelector((state) => state.coupon)

  useEffect(() => {
    getUserCart().then((res) => {
      setProducts(res.data.products)
      setTotal(res.data.cartTotal)
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
        toast.success('card is emapty. Continue shopping.')
      }
    })
  }

  const saveAddressToDb = () => {
    console.log(address)
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true)
        toast.success('Address saved')
      }
    })
  }

  const applyDiscountCoupon = () => {
    console.log('send coupon to backend', coupon)

    applyCoupon(user.token, coupon).then((res) => {
      console.log('RES ON COUPON APPLIED', res.data)
      if (res.data) {
        setTotalAfterDiscount(res.data)
        //update redux coupon applied true/false
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        })
      }
      //error
      if (res.data.err) {
        setDiscountError(res.data.err)
        //update redux coupon applied true/false
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        })
      }
    })
  }

  const showAddress = () => (
    <>
      <input
        type="text"
        className="form-control"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
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
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  )

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log('user cash order created res', res)
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
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Adress</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Card total {total}</p>

        {totalAfterDiscount == 0 && (
          <p className="bg-success p2">Discount Applied: Total payable: ${totalAfterDiscount}</p>
        )}
        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
                onClick={() => history.push('/payment')}
              >
                Place Order
              </button>
            )}
          </div>

          <div className="col-md-6">
            <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary">
              Empty card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
