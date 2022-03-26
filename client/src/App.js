import React, {useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import {currentUser} from './functions/auth';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';


const App = () => {
  const dispatch = useDispatch();

//to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
        .then(
            (res) => {
                dispatch({
            type: "LOGGID_IN_USER",
            payload: {
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
            },
        });
            }
        )
        .catch((err) => console.log(err));
      }
    });
    return () => unsubscribe();
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
        <Route  path="/user/history" element={<History />} />
        {/* <UserRoute  path="/user/history" element={<History />} /> */}
      </Routes>
    </>
  );
}

export default App;
