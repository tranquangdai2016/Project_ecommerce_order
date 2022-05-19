import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';


const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const Payment = ({ match }) => {
    const { orderId } = match.params

    return(
        <div className="container p-5 text-center">
            <h4> Thanh toán chuyển khoản</h4>
            <Elements stripe={promise}>
                <div className="container">
                    <StripeCheckout orderId={orderId} />
                </div>
            </Elements>
        </div>
    );
};

export default Payment;
