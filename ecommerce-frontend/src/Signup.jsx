import React from 'react'

const Signup = () => {
    return (  
        <>
            <div className="container">
                <div className="signup-card">
                    <div className="signup-section">
                        <h1 className='signup-title'>Sign Up</h1>
                        <input type="text" id='email' name='email' placeholder='Enter email' />
                        <input type="password" id='password' name='password' placeholder='Enter password' />
                        <button className='signup-button' >Sign Up</button>
                        <a href="/login" className='redirect-to-login'>Already have an account? Login Here!</a>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Signup;