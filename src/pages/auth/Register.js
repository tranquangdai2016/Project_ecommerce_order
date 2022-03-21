<<<<<<< HEAD
import React, {useState} from 'react'

const Register = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        //
    }
    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            autoFocus
            />
            <button 
            type="submit" 
            className="btn btn-raised">
                Register
            </button>
        </form>
    )
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <p>register form</p>
                    {registerForm()}
                </div>
            </div>            
=======
import React, { useState } from 'react'

const Register = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = () => {

    }
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
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
>>>>>>> 3f4ea4517aa7640a629d708a14e8212cab071d95
        </div>
    );
};

export default Register;