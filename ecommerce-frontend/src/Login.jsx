import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext';
import SHOW_PASSWORD from './assets/show-password.png';
import DONT_SHOW_PASSWORD from './assets/dont-show-password.png';

const Login = () => {
    const { handleLogin, emailError, passwordError, loginError, setEmailError, setPasswordError, setLoginError } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const login = async (email, password) => {
        try {
            const login = await handleLogin(email, password);
            if (login === true) {
                console.log("Success!");
                setEmailError("")
                setPasswordError("")
                setLoginError("")
                navigate("/"); // Login to the website and get directed to the front page  
            } else {
                throw Error(login);
            }
        } catch (error) {
            console.log(error.message);
            setLoginError(error.message);
        }
    }

    return (  
        <>
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Log In</h1>
                        <input type="text" id='email' name='email' value={email} placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                        <div className='error-message'>{emailError}</div>
                        <div className='password-field'>
                            <input type={showPassword ? "text" : "password"} id='password' name='password' value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                            <img src={showPassword ? SHOW_PASSWORD : DONT_SHOW_PASSWORD} alt="" className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className='error-message'>{passwordError}</div>
                        <button className='signup-button' onClick={() => login(email, password)}>Log In</button>
                        <div className='error-message'>{loginError}</div>
                        <a href="/signup" className='redirect-to-login'>Don't have an account? Sign up Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Login;