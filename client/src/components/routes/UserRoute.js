import React from "react";
import {Route,
     Navigate,
     Link} 
     from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect"

const UserRoute = ({ children, ...rest }) => {
    const {user} = useSelector((state) => ({ ...state}));

    return user && user.token ? (
        <Route {...rest} element={() => children} />
    ) : (
    <LoadingToRedirect />
    );
};

export default UserRoute;