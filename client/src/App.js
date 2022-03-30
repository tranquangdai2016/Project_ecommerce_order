import React, {useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch,
  // useHistory,
} from 'react-router-dom';
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
import AdminRoute from './components/routes/AdminRoute';
import Password from './pages/user/Password';
import WishList from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'


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
  },[dispatch]);
  return (
    <>
    <Router>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact  path="/" element={<Home />} />
        <Route exact  path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Register/Complete" element={<RegisterComplete />} />
        <Route exact path="/Forgot/Password" element={<ForgotPassword />} />
        <UserRoute exact path="/user/history" element={<History />} />
        <UserRoute exact path="/user/password" element={<Password />} />
        <UserRoute exact path="/user/wishlist" element={<WishList />} />
        <AdminRoute exact path="/admin/dashboard" element={<AdminDashboard />} />
        <AdminRoute exact path="/admin/category" element={<CategoryCreate />} />
        </Switch>
        </Router>
    </>
  );
}

export default App;
