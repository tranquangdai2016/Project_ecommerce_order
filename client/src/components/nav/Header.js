import React,{useState} from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, 
    SettingOutlined, 
    UserOutlined, 
    UserAddOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
// import { async } from "@firebase/util";
// useDispatch, 


const { SubMenu } = Menu;
const Header = () => {
    const [current,setCurrent] = useState();
    let dispatch = useNavigate();
    let user = useSelector( (state) => ({ ...state}) );
    let navigate = useNavigate();
    const handleClick = (e) => {
        console.log(e.key);
        setCurrent(e.key);
    }
    const logout = async () => {
        await getAuth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null
        });
        navigate("/login");
    }
    return (

        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home </Link>
        </Menu.Item>
        {!user && (<Menu.Item key="register" icon={<UserAddOutlined />} style={{ marginLeft: 'auto' }}>
        <Link to="register">Register</Link>
        </Menu.Item>)}
        {!user && (<Menu.Item key="login" icon={<UserOutlined />} >
        <Link to="login">Login</Link>
        </Menu.Item>)}
        {user && (
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} style={{ marginLeft: 'auto' }}>
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
        </SubMenu>)}
      </Menu>
    )
        
}
export default Header;