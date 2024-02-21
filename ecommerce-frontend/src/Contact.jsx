import React from 'react'
import Navbar from './Components/Navbar';
import './App.css'

const Contact = () => {
    return (  
        <>
            <Navbar/>
            <div className='contact-text-container'>
                <h1 className='contact-title'>Feel free to contact us at:</h1>
                <h1 className='contact-title'>gothgraphics@gmail.com</h1>
            </div>
            <div className="email-form">
                <form action="https://formspree.io/f/meqbrrle" method='POST'>
                    <div className='input-container'>
                        <input type="text" name='name' placeholder='Full Name' className='form-input' required />
                    </div>
                    <div className='input-container'>
                        <input type="email" name='email' placeholder='Email' className='form-input' required />
                    </div>
                    <div className='input-container'>
                        <textarea name='message' placeholder='Comment' rows={4} cols={30} className='form-input form-textarea' required></textarea>
                    </div>
                    <div className='input-container'>
                        <button className='send-button'>Send</button>
                    </div>
                </form>
            </div>
        </>
    );
}
 
export default Contact;