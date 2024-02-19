import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { useNavigate } from 'react-router-dom';

function App() {
  let [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate(); // Allows for navigating to a new page
  // Images taken from Amazon products containing clothing accessories
  const [pictures, setPictures] = useState(['/malegoth.jpg', '/handsonhips.jpg', '/gothbrace.jpg', '/gothpants.jpg']); // Sets pictures to be used for slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bottoms, setBottoms] = useState([]); // Stores bottoms in an array (important for filtering only for bottoms)
  const [tops, setTops] = useState([]); // Stores tops in an array (important for filtering only for tops)
  const [accessories, setAccessories] = useState([]); // Stores accessories in an array (important for filtering only for accessories)

  useEffect(() => {
    const getTops = async() => { // Retrieves all tops from the database
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
    //localStorage.clear();
    }

    const getBottoms = async() => { // Retrieves all bottoms from the database
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

    const getAccessories = async() => { // Retrieve all accessories from the database
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
    setCurrentIndex((index) => (index < pictures.length - 1 ? index + 1 : 0)); // Sets current index on which to advance (allows slideshow to restart when reaching the end)
  };
  
  // Use useEffect to automatically advance the slide
  useEffect(() => {
    const interval = setInterval(nextIndex, 2000); // Change images every 2 seconds
  
    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleClick = (id) => { // When user clicks on a product navigates them to the specific clothing item's page
    navigate(`/clothes/${id}`);
}

  return (
    <>
      <Navbar />
      <div className="image-container">
        {pictures.map((pic, index) => {
          return <img id='image' src={pic} alt="" key={index} style={{ display: index === currentIndex ? 'block' : 'none' }} height={1500} width={1500}/>
        })}
      </div>
        <h2 className='section-name'>Tops</h2>
        <div className="shirts">
          {tops.map((tops, index) => {
            if (index < 5) { // Prevent the sections in the front page from showing more than 5 of each item
              return  <div className="cards" key={index} onClick={() => handleClick(tops._id)}>
                        <div className="img-border">
                          <img className="gothpants" src={tops.image} alt="" width="280" height="300" />
                        </div>
                        <p>{tops.name}</p>
                        <p>${tops.price}</p>
                      </div>
            }
            })}
        </div>
        <h2 className='section-name'>Bottoms</h2>
        <div className="shirts">
          {bottoms.map((bottoms, index) => {
              if (index < 5) {
                return  <div className="cards" key={index} onClick={() => handleClick(bottoms._id)}>
                          <div className="img-border">
                            <img className="gothpants" src={bottoms.image} alt="" width="280" height="300" />
                          </div>
                          <p>{bottoms.name}</p>
                          <p>${bottoms.price}</p>
                        </div>
              }
              })}
        </div>
        <h2 className='section-name'>Accessories</h2>
        <div className="shirts">
          {accessories.map((accessories, index) => {
              if (index < 5) {
                return  <div className="cards" key={index} onClick={() => handleClick(accessories._id)}>
                          <div className="img-border">
                            <img className="gothpants" src={accessories.image} alt="" width="280" height="300" />
                          </div>
                          <p>{accessories.name}</p>
                          <p>${accessories.price}</p>
                        </div>
              }
              })}
        </div>
    </>
  )
}

export default App
