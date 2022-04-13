import React from "react";
import ModalImage from 'react-modal-image'
import laptop from "../../images/laptop.png"

const ProductCardInCheckout = () => {
    const colors = ["Black", "Brown", "Silver", "White", "Blue"];

    const handleColorChange = () => {

    }


    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />
                        ) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>${p.price}</td>
                <td>{p.brand}</td>
                <td>
                    <select
                        onChange={handleColorChange}
                        className="form-control"
                        name="color" id=""
                    >
                        {p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
                        {colors
                            .filter((c) => c !== p.color)
                            .map((c) => (
                                <option value={c} key={c}>{c}</option>
                            ))}
                    </select>
                </td>
                <td>{p.count}</td>
                <td>Shipping</td>
                <td>Delete Icon</td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout