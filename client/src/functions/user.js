import axios from "axios";
import coupon from "../../../server/models/coupon";

export const userCart = async (cart, authtoken) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                authtoken,
            },
        }
    );

export const getUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    }
    );

export const emptyUserCart = async (authtoken) =>
    await axios.delete(
        `${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    });

export const saveUserAddress = async (authtoken, address) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/address`,
        { address },
        {
            headers: {
                authtoken,
            },
        }
    );

export const applyCoupon = async (authtoken, coupon) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cart/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );

export const createOrder = async (authtoken, stripeResponse) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: {
                authtoken,
            },
        }
    );


export const createCashOrderForUser = async (authtoken, COD, couponTrueOrFalse) =>
    await axios.post(
        `${process.env.REACT_APP_API}/user/cash-order`,
        { couponApplied: couponTrueOrFalse, COD },
        {
            headers: {
                authtoken,
            },
        }
    );
