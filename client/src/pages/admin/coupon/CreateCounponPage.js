import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import DatePicker from 'react-datepicker'
import {
    getCounpons, 
    removeCoupon, 
    createCoupon
} from '../../../functions/coupon'
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCounponPage = () => {
    const [name,setName] = useState("");
    const [expiry,setExpiry] = useState("");
    const [discount,setDiscount] = useState("");
    const [loading,setLoading] = useState("");

    //redux

    const { user } = useSelector((state) => ({...state }));
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(name, expiry, discount);
        createCoupon(
            {name, expiry, discount}, user.token)
        .then((res) => {
            setLoading(false);
            setName("");
            setDiscount("");
            setExpiry("");
            toString.success(`"${res.data.name}" is created`);
        })
        .catch((err) => console.log("create coupon err", err))
    };
    return (
        <div className="container-fluid">
            <div class="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Coupon</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="" className="text-muted">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>
                    </form>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="" className="text-muted">Discount</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                autoFocus
                                required
                            />
                        </div>
                    </form>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="" className="text-muted">Expiry</label>
                            <br />
                            <DatePicker 
                            className="form-control"
                            selected={new Date()}
                            value={expiry}
                            onChange={(date) => setExpiry(date)}
                            required
                            />

                            <button className="btn btn-outline-primary">save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCounponPage;