import React, { useState, useEffect } from "react";
// import { getAuth } from '../../firebase';
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
// , googleAuthProvider

// const auth = getAuth();

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

    useEffect(() => {
        let intended = history.location.state;
        if(intended){
            return
        }else{
            if(user && user.token) history.push('/')}
    },[history, user])

    let dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        let intended = history.location.state;
        if(intended){
            history.push(intended.from)
        }else{
            if(res.data.role === 'admin'){
                history.push('/admin/dashboard');
            }else{
                history.push('/user/history');
            }
        }   
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.table(email, password);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result);
      const { user } = result;
      // console.log("1",user);
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      // history.push('/');
    } catch (error) {
      console.log('err', error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    const { user } = await signInWithPopup( auth, googleAuthProvider );
    console.log("user", user);
    const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGID_IN_USER",
            payload: {
              name: res.data.name,
              displayname: res.data.displayName,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      history.push("/");
  };

  // const googleLogin = async () => {
  //   await getAuth.signInWithPopup(GoogleAuthProvider).then(async (result) => {
  //     const { user } = result;
  //     const idTokenResult = await user.getIdTokenResult();

  // const googleLogin = async () => {
  //   const { user } = await signInWithPopup( auth, googleAuthProvider );
  //   console.log("user", user);
  //   dispatch({
  //     type: "LOGGID_IN_USER",
  //     payload: {
  //       name: user.data.name,
  //       email: user.data.email,
  //       token: user.token,
  //       role: user.role,
  //       _id: user.data._id,
  //     },
  //   })
  //   // roleBasedRedirect(user)
  //   .catch((err) => console.log(err))

  //   // const idTokenResult = await user.getIdTokenResult();
  //   //   createOrUpdateUser(user.accessToken)
  //   //     .then((res) => {
  //   //       dispatch({
  //   //         type: "LOGGID_IN_USER",
  //   //         payload: {
  //   //           name: res.data.name,
  //   //           email: res.data.email,
  //   //           token: idTokenResult.token,
  //   //           role: res.data.role,
  //   //           _id: res.data._id,
  //   //         },
  //   //       });
  //   //       roleBasedRedirect(res);
  //   //     })
  //   //     .catch((err) => console.log(err));
  //     history.push("/");
  // };
  
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your password"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with email/password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">loading...</h4>
          ) : (
            <h4>Login</h4>
          )}

          {loginForm()}

          <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
          >
            Login with Google
          </Button>

          <Link
            to="forgot/password"
            className="text-danger"
            style={{ marginLeft: "auto" }}
          >
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
