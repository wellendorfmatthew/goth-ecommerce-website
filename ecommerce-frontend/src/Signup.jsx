import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext';
import SHOW_PASSWORD from './assets/show-password.png';
import DONT_SHOW_PASSWORD from './assets/dont-show-password.png';

const Signup = () => {
    const { handleSignUp, emailError, passwordError, loginError, setEmailError, setPasswordError, setLoginError } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const signup = async (email, password) => {
        try {
            const signup = await handleSignUp(email, password);
            if (signup === true) {
                console.log("Success!");
                setEmailError("")
                setPasswordError("")
                setLoginError("")
                navigate("/"); // Login to the website and get directed to the front page  
            } else {
                throw Error(signup);
            }
        } catch (error) {
            console.log(error.message)
             setLoginError(error.message);
        }
    }

    return (
        <>
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Sign Up</h1>
                        <input type="text" id='email' name='email' value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        <div className='error-message'>{emailError}</div>
                        <div className='password-field'>
                            <input type={showPassword ? "text" : "password"} id='password' name='password' value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                            <img src={showPassword ? SHOW_PASSWORD : DONT_SHOW_PASSWORD} alt="" className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className='error-message'>{passwordError}</div>
                        <button className='signup-button' onClick={() => signup(email, password)}>Sign Up</button>
                        <div className='error-message'>{loginError}</div>
                        <a href="/login" className='redirect-to-login'>Already have an account? Login Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Signup;