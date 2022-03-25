import React, { useState ,useEffect } from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
// import { MailOutlined ,GoogleOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { GoogleAuthProvider,signInWithEmailAndPassword } from 'firebase/auth';
// import { async } from '@firebase/util';
import { Link } from 'react-router-dom';
import { createOrUpdateUser } from '../../functions/auth';


const Login = ({history}) => {
    const [email, setEmail] = useState("tranquangdai2016@gmail.com");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({ ...state }))
    useEffect(() => {
        if(user && user.token) history.push('/')
    },[history, user])
    let dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.table(email,password)
        try {
            const result = await signInWithEmailAndPassword(email,password)
            console.log(result)
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
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
            .catch();
            history.push('/');
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setLoading(false);
        }
    };

    const googleLogin = () => {
        auth.signInWithPopup(GoogleAuthProvider)
        .then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
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
                })
            .catch();
            history.push('/');
        })
        .catch(error => console.log(error))
    }
    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input type="email"  
            className='form-control'
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="your email"
            autoFocus
            />
        </div>
        <div className="form-group">
            <input type="password"  
            className='form-control'
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="your password"
            />
        </div>
        <br />
        <Button
        onClick={handleSubmit}
        type="primary"
        className='mb-3'
        block
        shape='round'
        icon='MailOutlined'
        size='large'
        disabled={ !email || password.length < 6 }
        >
            Login with email/password
        </Button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    { loading ? (<h4 className='text-danger'>loading...</h4>) : <h4>Login</h4>}
        
                    {loginForm()}

                    <Button
                    onClick={googleLogin}
                        type="danger"
                        className='mb-3'
                        block
                        shape='round'
                        icon='GoogleOutlined'
                        size='large'
                    >
                        Login with Google
                    </Button>

                    <Link to="forgot/password" className='text-danger' style={{ marginLeft: 'auto' }}>
                        forgot password
                    </Link>
                </div>
            </div>            
        </div>
    );
};

export default Login;