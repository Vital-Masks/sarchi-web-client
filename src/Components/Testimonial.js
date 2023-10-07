import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import URL from './utils.json';

function Testimonial() {
  const [testimonialData, setTestimonialData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(URL.BASE_URL+'/api/testimonials')
      .then((response) => {
        setTestimonialData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Function to handle automatic slide change every 10 seconds
  const handleSlideChange = () => {
    const nextIndex = (currentIndex + 1) % testimonialData.length;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(handleSlideChange, 10000); // 10 seconds
    return () => clearInterval(intervalId);
  }, [currentIndex, testimonialData.length]);

  return (
    <>
      {/* Testimonial Start */}
      <section className="testimonials-container">
        <div className="container py-5">
          <h1 className="display-6 mb-4" style={{ fontFamily: 'Alatsi' }}>
            WHAT DO CLIENTS FEEL ABOUT US?
          </h1>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            selectedItem={currentIndex}
            showIndicators={false}
            infiniteLoop={true} // Enable infinite loop
            onChange={(index) => setCurrentIndex(index)} // Update currentIndex on slide change
          >
            {testimonialData.map((item, index) => (
              <div className="testimonial" key={index} >
                <p style={{fontSize: '20px',fontFamily:'Alatsi'}}>{item.attributes.Testimonial}</p>
                <h3 style={{fontFamily:'Poppins'}}>{item.attributes.Reviewer}</h3>
                <h3 style={{ fontSize: '15px', color: 'grey',fontFamily:'Poppins' }}>{item.attributes.Designation}</h3>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      {/* Testimonial End */}
    </>
  );
}

export default Testimonial;
