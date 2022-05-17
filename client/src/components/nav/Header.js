import React, { useCallback, useEffect, useState } from 'react'
import { Menu, Badge } from 'antd'
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../forms/Search'
import { getDataLocalstorage } from '../../functions/user'

const Header = () => {
  const [userValue, setUserValue] = useState()
  const [current, setCurrent] = useState()
  let dispatch = useDispatch()
  let { cart } = useSelector((state) => ({ ...state }))
  let history = useHistory()
  const location = useLocation()
  const [reloadHome, setReloadHome] = useState(false)

  const { SubMenu, Item } = Menu

  useEffect(() => {
    getDataLocalstorage() && setReloadHome(true)
  }, [location.pathname])

  const logout = useCallback(() => {
    localStorage.removeItem('users')
    localStorage.removeItem('token')
    setReloadHome(false)
    history.push('/')
  }, [getDataLocalstorage()])

  return (
    <Menu mode="horizontal" defaultSelectedKeys={['home']}>
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Trang chủ </Link>
      </Menu.Item>

      <Menu.Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Cửa hàng </Link>
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Giỏ hàng
          </Badge>
        </Link>
      </Menu.Item>
      <Menu.Item className="float-right p-2">
        <Search></Search>
      </Menu.Item>

      {!getDataLocalstorage() && (
        <>
          <Menu.Item key="register" icon={<UserAddOutlined />} style={{ marginLeft: 'auto' }}>
            <Link to="register">Đăng ký</Link>
          </Menu.Item>
          <Menu.Item key="login" icon={<UserOutlined />}>
            <Link to="login">Đăng nhập</Link>
          </Menu.Item>
        </>
      )}
      {reloadHome && (
        <>
          <SubMenu
            key="SubMenu"
            icon={<UserOutlined />}
            title={
              getDataLocalstorage().user.email && getDataLocalstorage().user.email.split('@')[0]
            }
            className="float-right"
            style={{ marginLeft: 'auto' }}
          >
            <Menu.Item>
              Dashboard
              <Link to="/admin/dashboard">
                {getDataLocalstorage() && getDataLocalstorage().user.role === 'subscriber' && (
                  <Menu.Item key="two">
                    <Link to="/user/history">Dashboard</Link>
                  </Menu.Item>
                )}
              </Link>
            </Menu.Item>

            {/* {user && user.role === 'admin' && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )} */}

            {/* <div onClick={logout}>Logout</div> */}
          </SubMenu>

          <Menu.Item onClick={logout} icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}
export default Header
