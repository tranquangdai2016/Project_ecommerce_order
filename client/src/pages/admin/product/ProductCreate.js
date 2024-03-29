import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import ImageUploader from 'react-images-upload'
import GetBase64 from '../../../utils/getbase64'

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  link: '',
  subs: [],
  shipping: 'Yes',
  quantity: '',
  images: [],
  colors: ['Đen', 'Trắng', 'Vàng', 'Xanh', 'Đỏ'],
  brands: ['1Histhop', 'Emily Shop', 'Xiaozhaivn', 'CHADDIE', '1994CLOSET'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  color: '',
  brand: '',
  size: '',
}
const ProductCreate = () => {
  const [values, setvalues] = useState(initialState)
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [loading, setLoading] = useState(false)
  //redux
  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    loadCategories()
  }, [])
  const loadCategories = () =>
    getCategories().then((c) => setvalues({ ...values, categories: c.data }))
  //d

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct(values)
      .then((res) => {
        if (res) {
          console.log(res)
          // window.alert(`"${res.data.title}" is created `)
          toast.success(res.data.title, 'Thêm sản phẩm thành công', {
            position: toast.POSITION.TOP_RIGHT,
          })
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err)
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err)
      })
  }
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const setSubsOnchange = (e) => {
    console.log(e)
    setvalues({ ...values, subs: e })
  }
  const handleCategoryChange = (e) => {
    e.preventDefault()
    console.log('click category', e.target.value)
    setvalues({ ...values, subs: [], category: e.target.value })
    getCategorySubs(e.target.value).then((res) => {
      console.log('SUB OPTION CATEGORY CLICK', res.data)
      setSubOptions(res.data)
      setShowSub(true)
    })
  }

  const onDrop = (thumbnail) => {
    setTimeout(async () => {
      if (thumbnail && thumbnail[0]) {
        const base64 = await GetBase64(thumbnail[0])
        setvalues({ ...values, ...{ images: base64 } })
      } else {
        setvalues({ ...values, ...{ images: null } })
      }
    }, 500)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Thêm sản phẩm</h4>
          <hr />
          {/* {JSON.stringify(values.images)} */}
          <div className="p-3">
            <ImageUploader
              withIcon={false}
              singleImage={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />

            {/* <FileUpload values={values} setvalues={setvalues} setLoading={setLoading} /> */}
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setSubsOnchange={setSubsOnchange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  )
}
export default ProductCreate
