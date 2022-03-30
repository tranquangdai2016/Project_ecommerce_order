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
import CategoryUpdate from './pages/admin/category/CategoryUpdate'


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
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact  path="/" component={Home} />
        <Route exact  path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={WishList} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute 
        exact 
        path="/admin/category/:slug" 
        component={CategoryUpdate} />
        </Switch>
    </>
  );
}

export default App;
