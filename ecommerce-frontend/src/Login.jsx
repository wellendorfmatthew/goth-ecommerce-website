import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch("http://localhost:4015/user/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            console.log("Success! heres the data ", data);
            setEmailError("");
            setPasswordError("");
            setLoginError("");
            navigate("/");

        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
            setLoginError(error.message);
            return;
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
                        <input type="password" id='password' name='password' value={password} placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} />
                        <div className='error-message'>{passwordError}</div>
                        <button className='signup-button' onClick={() => handleLogin(email, password)}>Log In</button>
                        <div className='error-message'>{loginError}</div>
                        <a href="/signup" className='redirect-to-login'>Don't have an account? Sign up Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Login;