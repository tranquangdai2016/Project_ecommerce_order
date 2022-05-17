import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/product" className="nav-link">
            Thêm sản phẩm
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/products" className="nav-link">
            Tất cả sản phẩm
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/category" className="nav-link">
            Danh mục
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/sub" className="nav-link">
            Danh mục phụ
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/admin/coupon" className="nav-link">
            Phiếu giảm giá
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default AdminNav
