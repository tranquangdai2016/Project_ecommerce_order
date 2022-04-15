import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout"
import { userCart } from "../functions/user";

const Cart = () => {
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
         // console.log("cart",Json.stringify(cart,null, 4));
         userCart(cart, user.token)
         .then((res) => {
             console.log("CART POST RES")
             if (res.data.ok) history.push("checkout");
         })
         .catch((err) => console.log("cart save err",err));
         history.push("/checkout");
    }

    const showCartItems = () => {
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <td scope="col">Image</td>
                    <td scope="col">Name</td>
                    <td scope="col">Price</td>
                    <td scope="col">Brand</td>
                    <td scope="col">Color</td>
                    <td scope="col">Count</td>
                    <td scope="col">Shipping</td>
                    <td scope="col">Remove</td>
                </tr>
            </thead>

            {cart.map((p) => 
                <ProductCardInCheckout key={p._id} p={p}></ProductCardInCheckout>
            )}
        </table>
    }

    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Cart / {cart.length} Product</h4>
                    {!cart.length ? (<h4>
                        No products in cart. <Link to="/shop">Continue Shopping</Link>
                    </h4>) : (
                        showCartItems()
                    )}
                </div>
                <div className="col-md-4">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p>{cart.title} x {cart.count} = ${cart.price * cart.count}</p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user ? (
                            <button onClick={saveOrderToDb}
                                className="btn btn-sm btn-primary mt-2"
                                disabled={!cart.length}
                            >
                                Proceed to checkout
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-primary mt-2">
                                <Link to={{
                                    pathname: "/login",
                                    state: { from: "cart" }
                                }}>Login to checkout</Link>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart