import React, {useEffect} from 'react';
import './App.css';
import { Routes,Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from './components/nav/Header';
import 'antd/dist/antd.min.css';
import RegisterComplete from './pages/auth/RegisterComplete';
import {auth} from './firebase';
import { useDispatch } from 'react-redux';
// import { async } from '@firebase/util';
import ForgotPassword from './pages/auth/ForgotPassword';

const App = () => {
  const dispatch = useDispatch();

//to check firebase auth state
  useEffect(() => {
     auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type: "LOGGID_IN_USER",
          payload: {
            email: "user.email",
            token: idTokenResult.token,
          }
        })
      }
    });
  },[]);
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route  path="/Login" element={<Login />} />
        <Route  path="/Register" element={<Register />} />
        <Route  path="/Register/Complete" element={<RegisterComplete />} />
        <Route  path="/Forgot/Password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
