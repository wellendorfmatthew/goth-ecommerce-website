import React from 'react'

const Login = () => {
    return (  
        <>
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Log In</h1>
                        <input type="text" id='email' name='email' placeholder='Enter email' />
                        <input type="password" id='password' name='password' placeholder='Enter password' />
                        <button className='signup-button' >Log In</button>
                        <a href="/signin" className='redirect-to-login'>Don't have an account? Sign up Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Login;