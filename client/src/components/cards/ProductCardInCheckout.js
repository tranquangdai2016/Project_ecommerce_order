import React, { useState } from "react";

const ProductCardInCheckout = () => {
    return (
        <tbody>
            <tr>
                <td>Image</td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>Shipping</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout