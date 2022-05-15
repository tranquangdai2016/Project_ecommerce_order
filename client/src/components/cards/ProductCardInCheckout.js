import React from "react";
import ModalImage from 'react-modal-image'
import laptop from "../../images/laptop.png"
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons'


const ProductCardInCheckout = ({ product }) => {
    console.log(product)
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];
    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        let cart = []
        if (typeof window !== 'undefined') {
            //if cart is in localstorage GET it
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((productItem, i) => {
                if (productItem._id === product._id) {
                    cart[i].color = e.target.value
                }
            })
            //console.log('cart update color', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    const handleQuantityChange = e => {
        //console.log('available quantity', product.quantity)

        let count = e.target.value < 1 ? 1 : e.target.value;

        if (count > product.quantity) {
            toast.error(`Max available quantity: ${product.quantity}`);
            return;
        }

        let cart = []

        if (typeof window !== 'undefined') {
            //if cart is in localstorage GET it
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((productItem, i) => {
                if (productItem._id === product._id) {
                    cart[i].count = count
                }
            })
            //console.log('cart update count', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }

    const handleRemove = () => {
        //console.log(product._id, 'to remove')
        let cart = []

        if (typeof window !== 'undefined') {
            //if cart is in localstorage GET it
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }

            cart.map((productItem, i) => {
                if (productItem._id === product._id) {
                    cart.splice(i, 1)
                }
            })
            //console.log('cart update count', cart)
            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart
            });
        }
    }


    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {product.images ? (
                            <ModalImage small={product.images} large={product.images} />
                        ) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>
                    <select
                        onChange={handleColorChange}
                        className="form-control"
                        name="color" id=""
                    >
                        {product.color ? <option value={product.color}>{product.color}</option> : <option>Select</option>}
                        {colors
                            .filter((c) => c !== product.color)
                            .map((c) => (
                                <option value={c} key={c}>{c}</option>
                            ))}
                    </select>
                </td>
                <td className="text-center">
                    <input onChange={handleQuantityChange} type="number" className="form-control" value={product.count} />
                </td>
                <td className="text-center">
                    {
                        product.shipping === "Yes" ? (
                            <CheckCircleOutlined className="text-success" />
                        ) : (
                            <CloseCircleOutlined className="text-success" />
                        )
                    }
                </td>
                <td className="text-center">
                    <CloseOutlined onClick={handleRemove} className="text-danger pointer" />
                </td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout