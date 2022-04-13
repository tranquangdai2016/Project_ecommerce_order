import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const Cart = () => {
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    
    return (
        <div className="container-fluid">
            <div className="row">
                <h4>Cart</h4>
            </div>
        </div>
    )
}

export default Cart