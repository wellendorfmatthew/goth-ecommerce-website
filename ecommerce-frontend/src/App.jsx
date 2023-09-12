import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="top-section">
        <div className="links">
          <a href="/"><img className='logo' src='/gothgraphic.jpg' height={180} width={180} /></a>
          <h2><a href="/products" id='product'>Products</a></h2>
          <h2><a href="/contact" id='contact'>Contact</a></h2>
          <h2><a href="/about" id='about'>About Us</a></h2>
          <a href="/cart" id='cart'><img src="/coffin.png" width={50} height={50} /></a>
          <h2><a href="/signin" id='sign-in'>Sign In</a></h2>
        </div>
      </div>
      <div className="top-divider">
        <hr />
      </div>
    </>
  )
}

export default App
