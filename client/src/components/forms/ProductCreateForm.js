import React from 'react'
import { Select } from 'antd'
const { Option } = Select

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setSubsOnchange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    sizes,
    link,
    color,
    size,
    brand,
  } = values

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={values.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Link sản phẩm</label>
        <input
          type="text"
          name="link"
          className="form-control"
          value={values.link}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mô tả sản phẩm</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Giá</label>
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
        <option>Please select </option>

        <select name="shipping" className="form-control" onChange={handleChange}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Số Lượng</label>
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
        <select name="color" className="form-control" onChange={handleChange}>
          <option>Please select </option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Size</label>
        <select name="size" className="form-control" onChange={handleChange}>
          <option>Please select </option>
          {sizes.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Brand</label>
        <select name="brand" className="form-control" onChange={handleChange}>
          <option>Please select </option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label> Category</label>
        <select name="category" className="form-control" onChange={handleCategoryChange}>
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {showSub && (
        <div>
          <label>Sub categories</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            value={subs}
            onChange={(value) => {
              console.log(value)
              setSubsOnchange(value)
            }}
          >
            {subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </div>
      )}

      <button className="btn btn-outline-info">Save</button>
    </form>
  )
}
export default ProductCreateForm
