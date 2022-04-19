import axious from "axios";

export const getCoupons = async () => 
    await axious.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
    await axious.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
        headers: {
            authtoken,
        }
    });

export const createCoupon = async (coupon, authtoken) => 
    await axious.post(
        `${process.env.REACT_APP_API}/coupon`,
        { coupon },
        {
            headers: {
                authtoken,
            },
        }
    );
