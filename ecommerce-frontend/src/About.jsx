import React from 'react'
import Navbar from './Components/Navbar';
import './App.css'

const About = () => {
    return (  
        <>
            <Navbar/>
            <div className="image-holder">
                <img src="/gothgraphic.jpg" alt="" height={400} width={400} className='about-image'/>
            </div>
            <div className="paragraph">
                <p>Here at Goth Graphics we strive to provide our customers with a diverse selection of gothic themed clothes and accessories. From arm sleeves to hoodies and necklaces you'll for sure find something you like. We can't wait to open shop soon and assist customers in picking a style that fits them best! Stay tuned for more information.</p>
            </div>
        </>
    );
}
 
export default About;