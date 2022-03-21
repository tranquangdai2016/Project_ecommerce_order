import React, { useState } from 'react';
import {auth} from '../../firebase';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const Register = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.prevenDefault();
        const config = {
            url: 'http://locaclhost:3000/register/complate',
            handleCodeInApp: true
        }
        await auth.sendSignInLinkToEmail(email,config);
        toast.success('Email is send to ${email}. Click links to registration')
    };

    window.localStorage.setItem('emailForRegistration', email)
    const registerForm = () => <form onSubmit={handleSubmit}>
        <input type="email"  
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        className='form-control'
        />
        <button type="submit" className='btn btn-raised'>
            Reigister / {email}
        </button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <p>register form</p>
                    {registerForm()}
                </div>
            </div>            
        </div>
    );
};

export default Register;