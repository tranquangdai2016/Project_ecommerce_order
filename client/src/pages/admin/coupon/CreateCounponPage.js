import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { DatePicker } from 'antd'
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon'
import 'react-datepicker/dist/react-datepicker.css'
import { DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'

const CreateCounponPage = () => {
  const [code, setCode] = useState('')
  const [expiry, setExpiry] = useState(new Date())
  const [discount, setDiscount] = useState(0)
  const [loading, setLoading] = useState('')
  const [coupons, setCoupons] = useState([])

  //redux

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadAllCoupons()
  }, [])

  function onChange(value, dateString) {
    setExpiry(value)
  }

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data))
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // console.table(name, expiry, discount);
    createCoupon({ code, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false)
        loadAllCoupons() //load all coupons
        setCode('')
        setDiscount('')
        setExpiry('')
        toast.success(`"${res.data.code}" is created`)
      })
      .catch((err) => {
        toast.error(`Không thể thêm mã giảm giá`)
        console.log('create coupon err', err)
      })
  }

  const handleRemove = (couponId) => {
    if (window.confirm('Delete?')) {
      setLoading(true)
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons() //load all coupons
          setLoading(false)
          toast.error(`Coupon "${res.data.code}" deleted`)
        })
        .catch((err) => console.log(err))
    }
  }
  return (
    <div className="container-fluid">
      <div class="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <h4 className="text-danger">loading ...</h4> : <h4>Mã giảm giá</h4>}
          <form onSubmit={handleSubmit} className="col-6">
            <div className="form-group">
              <label for="" className="text-muted">
                Code
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label for="" className="text-muted">
                Discount
              </label>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <label for="" className="text-muted">
                Expiry
              </label>
              <br />
              <DatePicker showTime onChange={onChange} />
            </div>
            <div class="d-flex justify-content-center">
              <button className="btn btn-outline-primary">save</button>
            </div>
          </form>
          <br />
          <h4>{coupons.length} Coupons</h4>
          <table className="table table-bodered">
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Expire</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                return (
                  <tr key={c._id}>
                    <td>{c.code}</td>
                    <td>{new Date(c.expiry).toLocaleString()}</td>
                    <td>{c.discount}</td>
                    <td>
                      <DeleteOutlined
                        onClick={() => handleRemove(c._id)}
                        className="text-danger pointer"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreateCounponPage
