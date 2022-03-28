import React, { useState, useEffect } from 'react';
import {auth} from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
// import { async } from '@firebase/util';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState();
    const [loading,setLoading] = useState(false);

    const {user} = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if(user && user.token) history.push('/')
    }, [user, history])
    const handleSbmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('')
            setLoading(false)
            toast.success("check your email for password reset Link");
        })
        .catch((error) => {
            setLoading(false)
            toast.error(error.message);
            console.log("ERROR MSG IN FORGOT PASSWORD", error);
        });
    };
    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            {loading ? <h4 className='text-danger'>loading</h4> : <h4>forgot password</h4>}
            
            <form onSubmit={handleSbmit}>
                <input 
                type="email" 
                className='form-control' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                autoFocus
                />
                <br/>
                <button className='btn btn-raised' disabled={!email}>Submit</button>
            </form>
        </div>
    )
}



export default ForgotPassword;