import React from "react";
import { Route, Switch } from "react-router-dom";
import History from "./pages/user/History";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import SubCreate from "./pages/admin/sub/SubCreate"
import SubUpdate from "./pages/admin/sub/SubCreate"
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
      <AdminRoute
        exact
        path="/admin/category/:slug"
        component={CategoryUpdate}
      />
      <AdminRoute path="/admin/sub" component={SubCreate} />
      <AdminRoute
        exact
        path="/admin/sub/:slug"
        component={SubUpdate}
      />
    </Switch>
  );
};

export default Routers;