import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Sections from './Sections.jsx';
import Contact from './Contact.jsx';
import About from './About.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signin' element={<Signup />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
