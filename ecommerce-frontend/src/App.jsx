import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar'

function App() {
  // Images taken from Amazon products containing clothing accessories
  const [pictures, setPictures] = useState(['/malegoth.jpg', '/handsonhips.jpg', '/gothbrace.jpg', '/gothpants.jpg']); // Sets pictures to be used for slideshow
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a function to increment the slide index
  const nextIndex = () => {
    setCurrentIndex((index) => (index < pictures.length - 1 ? index + 1 : 0));
  };
  
  // Use useEffect to automatically advance the slide
  useEffect(() => {
    const interval = setInterval(nextIndex, 2000); // Change images every 2 seconds
  
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar/>
      <div className="image-container">
        {pictures.map((pic, index) => {
          return <img id='image' src={pic} alt="" key={index} style={{ display: index === currentIndex ? 'block' : 'none' }} height={1500} width={1500}/>
        })}
      </div>
      <hr className='first-line' />
      <div className="shirt-section">
        <h2>Shirts</h2>
      </div>
      <div className="shirts">
        <div className="shirt-cards">
        </div>
      </div>
    </>
  )
}

export default App
