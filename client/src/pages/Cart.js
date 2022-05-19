import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

const Cart = ({ history }) => {
  const [user, setUser] = useState({})
  const { cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let user = {}
      if (localStorage.getItem('users')) {
        user = JSON.parse(localStorage.getItem('users'))
      } else {
        user = {}
      }
      setUser(user)
    }
  }, [])

  const getTotal = () => {
    console.log(cart)
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDb = () => {
    // console.log("cart",Json.stringify(cart,null, 4));
    userCart(cart)
      .then((res) => {
        console.log('CART POST RES')
        if (res.data.ok) history.push('checkout')
      })
      .catch((err) => console.log('cart save err', err))
    // history.push('/checkout')
  }

  const saveCashOrderToDb = () => {
    dispatch({
      type: 'COD',
      payload: true,
    })
    userCart(cart, user.token)
      .then((res) => {
        //console.log("Cart post res", res);
        if (res.data.ok) history.push('/checkout')
      })
      .catch((err) => console.log('cart save err', err))
  }

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td scope="col">Image</td>
          <td scope="col">Name</td>
          <td scope="col">Price</td>
          <td scope="col">Brand</td>
          <td scope="col">Color</td>
          <td scope="col">Size</td>
          <td scope="col">Count</td>
          <td scope="col">Shipping</td>
          <td scope="col">Remove</td>
        </tr>
      </thead>

      {cart.map((product) => (
        <ProductCardInCheckout key={product._id} product={product}></ProductCardInCheckout>
      ))}
    </table>
  )

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (
            <h4>
              Không có sản phẩm trong giỏ hàng <Link to="/shop">Tiếp tục mua sắm</Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((product, i) => (
            <div key={i}>
              <p>
                {product.price} x {product.count} = {product.price * product.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>${getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Thanh toán
              </button>
              <br />
              {/* <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warming mt-2"
                disabled={!cart.length}
              >
                Thanh toán khi nhận được hàng
              </button> */}
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: '/login',
                  state: { from: 'cart' },
                }}
              >
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
