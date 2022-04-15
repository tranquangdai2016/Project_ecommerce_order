import React from 'ract';

const Checkout = () => {
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