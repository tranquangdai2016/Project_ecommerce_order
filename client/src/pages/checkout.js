import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getUserCart } from '../functions/user';
const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            console.log("user cart res", JSON.stringify(res.data,null,4));
            setProducts(res.data.producs);
            setTotal(res.data.cartTotal);
        }, []);
    });

    const saveAddressToDb = () => {
        //
    }
    return(
        <div className="row">
            <div className="col-md-6">
                <h4>Delivery Adress</h4>
                <br />
                <br />
                textarea
                <button className="btn btn-primary mt-2" onclick="{saveAddressToDb}">
                    Save
                </button>
                <hr />
                <h4>Got CouPon?</h4>
                <br />
                counpon input and apply button
            </div>

            <div className="col-md-6">
                <h4>Order Summary</h4>
                <h1>{total}</h1>
                {JSON.stringify(products)}
                <hr />
                <p>Products x</p>
                <hr />
                <p>List of products</p>
                <hr />
                <p>Card total $x</p>
                <div className='row'>
                    <div className='col-md-6'>
                        <button className="btn btn-primary">Place Order</button>
                    </div>

                    <div className='col-md-6'>
                        <button className="btn btn-primary">Empty card</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;