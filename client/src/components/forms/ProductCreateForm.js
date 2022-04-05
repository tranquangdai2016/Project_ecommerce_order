
import React from "react";

const ProductCreateForm = ({ handleSubmit,
     handleChange, 
     values ,
     handleCategoryChange,
     subOptions,
     showSub
     }) => {
    const { title, descriptioin, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand, } = values;

    return (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" value={values.title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Descriptioin</label>
                <input type="text" name="descriptioin" className="form-control" value={descriptioin} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <option >Please select </option>

                <select name="shipping" className="form-control" onChange={handleChange} >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>

                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select name="color" className="form-control" onChange={handleChange} >
                    <option >Please select </option>
                    {colors.map(c => <option key={c} value={c}>{c}</option>)}

                </select>
            </div>
            <div className="form-group">
                <label>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange} >
                    <option >Please select </option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}

                </select>
            </div>

            <div className="form-group">
                <label> Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}>

                    <option>Please select</option>
                    {categories.length > 0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-outline-info">Save</button>

        </form>
    )
}
export default ProductCreateForm;