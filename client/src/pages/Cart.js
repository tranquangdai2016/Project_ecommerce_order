import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'

const Cart = () => {
    const { user, cart } = useSelector((state) => ({ ...state }))
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue += nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {

    }

    const showCartItems = () => {
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <td scope='col'>Image</td>
                    <td scope='col'>Name</td>
                    <td scope='col'>Price</td>
                    <td scope='col'>Brand</td>
                    <td scope='col'>Color</td>
                    <td scope='col'>Count</td>
                    <td scope='col'>Shipping</td>
                    <td scope='col'>Remove</td>
                </tr>
            </thead>

            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}

        </table>
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
            </div>
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>
                    {!cart.length
                        ?
                        (<h4>No product in car. <Link to="/shop">Continue Shopping</Link> </h4>)
                        :
                        (showCartItems())
                    }
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{c.title} x {c.count} = ${c.price * c.count}</p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user ? (
                            <button
                                onClick={saveOrderToDb}
                                className="btn btn-small btn-primary mt-2"
                                disabled={!cart.length}
                            >
                                Proceed to checkout
                            </button>
                        ) : (
                            <button className="btn btn-small btn-primary mt-2">
                                <Link to={{
                                    pathname: "/login",
                                    state: { from: "cart" },
                                }}>Login to checkout</Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;