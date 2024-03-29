import React from 'react'
import { Select } from 'antd'
import ProductUpdate from '../../pages/admin/product/ProductUpdate'

const { Option } = Select

const ProductUpdateFrom = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArryOfSubs,
  selectedCategory,
}) => {
  //destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values
  console.log('Value', category)

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === 'Yes' ? 'Yes' : 'No'}
          name="Shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Color</label>
        <select value={color} name="color" className="form-control" onChange={handleChange}>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Brands</label>
        <select value={brand} name="brand" className="from-control" onChange={handleChange}>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" className="form-control" onChange={handleCategoryChange}>
          {categories &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArryOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </select>
      </div>
      <br />
      <button className="btn btn-outline-info">Lưu</button>
    </form>
  )
}
export default ProductUpdateFrom
