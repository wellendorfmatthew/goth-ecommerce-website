import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'

function App() {
  // Images taken from Amazon products containing clothing accessories
  const [pictures, setPictures] = useState(['/malegoth.jpg', '/handsonhips.jpg', '/gothbrace.jpg', '/gothpants.jpg']); // Sets pictures to be used for slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottoms, setBottoms] = useState([]);
  const [tops, setTops] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const getTops = async() => {
      try {
        const response = await fetch("http://localhost:4015/clothes/getTops?clothing_type=tops");
        console.log(response, "This is the response");

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTops(data);
        console.log(data);
      } catch (error) {
        console.log("Couldn't get posts", error);
      }
    }

    const getBottoms = async() => {
      try {
        const response = await fetch("http://localhost:4015/clothes/getBottoms?clothing_type=bottoms");
        console.log(response, "This is the response");

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBottoms(data);
        console.log(data);
      } catch (error) {
        console.log("Couldn't get posts", error);
      }
    }

    const getAccessories = async() => {
      try {
        const response = await fetch("http://localhost:4015/clothes/getAccessories?clothing_type=accessories");
        console.log(response, "This is the response");

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAccessories(data);
        console.log(data);
      } catch (error) {
        console.log("Couldn't get posts", error);
      }
    }

    getTops();
    getBottoms();
    getAccessories();
  }, []);

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
        <h2>Tops</h2>
      </div>
      <div className="shirts">
        {tops.map((tops, index) => {
          return  <div className="cards" key={index}>
                    <div className="img-border">
                      <img className="gothpants" src={tops.image} alt="" width="280" height="300" />
                    </div>
                    <p>{tops.name}</p>
                    <p>${tops.price}</p>
                  </div>
          })}
      </div>
      <div className="shirt-section">
        <h2>Bottoms</h2>
      </div>
      <div className="shirts">
        {bottoms.map((bottoms, index) => {
          return  <div className="cards" key={index}>
                    <div className="img-border">
                      <img className="gothpants" src={bottoms.image} alt="" width="280" height="300" />
                    </div>
                    <p>{bottoms.name}</p>
                    <p>${bottoms.price}</p>
                  </div>
        })}
      </div>
      <div className="shirt-section">
        <h2>Accessories</h2>
      </div>
      <div className="shirts">
        {accessories.map((accessories, index) => {
          return  <div className="cards" key={index}>
                    <div className="img-border">
                      <img className="gothpants" src={accessories.image} alt="" width="280" height="300" />
                    </div>
                    <p>{accessories.name}</p>
                    <p>${accessories.price}</p>
                  </div>
          })}
      </div>
    </>
  )
}

export default App
