import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png"
import { Drawer, Button } from "antd";

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        with: '100%',
        height: '50px',
        objectfit: 'cover'
    }

    return (
        <Drawer
            className="text-center"
            title={`Cart / ${cart.length} Product`}
            placement="right"
            onClose={() => {
                // close side bar
                dispatch({
                    type: 'SET_VISIBLE',
                    payload: false
                });
            }}
            visible={drawer}>
            {cart.map((p) => (
                <div className="row" key={p._id}>
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0]} alt="" style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        ) : (
                            <>
                                <img src={laptop} alt="" style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} x {p.count}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}
            <Link to="/cart">
                <button onClick={() =>
                    dispatch({
                        type: 'SET_VISIBLE',
                        payload: false
                    })
                } className="text-center btn btn-primary btn-raised btn-block">
                    Go to cart
                </button>
            </Link>
        </Drawer >
    )
}

export default SideDrawer