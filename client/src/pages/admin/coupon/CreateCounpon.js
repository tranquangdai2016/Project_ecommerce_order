import React from "react"
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
    return (
        <div className="container-fluid">
            <div class="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    <h4>Coupon</h4>
                </div>
            </div>
        </div>
    );
};

export default CreateCounponPage;