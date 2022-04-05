import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Search from "../forms/Search";


const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState();
  let dispatch = useHistory();
  let user = useSelector((state) => ({ ...state }));
  let history = useHistory();
  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  const logout = async () => {
    await getAuth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home </Link>
      </Item>
      {!user && (
        <Item
          key="register"
          icon={<UserAddOutlined />}
          style={{ marginLeft: "auto" }}
        >
          <Link to="register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />}>
          <Link to="login">Login</Link>
        </Item>
      )}
      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
          style={{ marginLeft: "auto" }}
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="d-flex justify-content-end p-1">
        <Search />
      </span>
    </Menu>
  );
};
export default Header;
