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
import { CartProvider } from './CartContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Confirmation from './Confirmation.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import Profile from './Profile.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
            <Routes>
              <Route index element={<App />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/contact' element={<Contact />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/products' element={<Products />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/confirmation' element={<Confirmation />} />
              <Route exact path='/clothes/:id' element={<Sections />} />
              <Route exact path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
