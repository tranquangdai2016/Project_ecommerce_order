import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png"
import { Drawer, Button } from "antd";

const SideDrawer = ({ children }) => {
    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    return <Drawer visible={true}>
        {}
    </Drawer>
}

export default SideDrawer