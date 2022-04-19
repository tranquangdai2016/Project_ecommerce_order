import React from "react";
import { Route, Switch } from "react-router-dom";
import History from "./pages/user/History";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubCreate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import WishList from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AllProducts from "./pages/admin/product/AllProducts";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/checkout";
import CreateCounponPage from "./pages/admin/coupon/CreateCounponPage";
import Payment from "./pages/Payment";
const Routers = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/register" component={Register} />
      <Route path="/register/complete" component={RegisterComplete} />
      <Route path="/forgot/password" component={ForgotPassword} />
      <UserRoute path="/user/history" component={History} />
      <UserRoute path="/user/password" component={Password} />
      <UserRoute path="/user/wishlist" component={WishList} />
      <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoute path="/admin/category" component={CategoryCreate} />
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
      <AdminRoute path="/admin/sub" component={SubCreate} />
      <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />

      <AdminRoute exact path="/admin/products" component={AllProducts} />
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
      <AdminRoute exact path="/admin/product" component={ProductCreate} />
      <Route exact path="/product/:slug" component={Product} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart" component={Cart} />
      <UserRoute exact path="/checkout" component={Checkout} />
      <AdminRoute exact path="/admin/coupon" component={CreateCounponPage} />
      <UserRoute exact path="/payment" component={Payment} />

    </Switch>
  );
};

export default Routers;
