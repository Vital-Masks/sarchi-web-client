import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function AboutUs() {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    fetch('http://157.230.236.88:1337/api/about-us')
      .then((response) => response.json())
      .then((data) => {
        let items = data.data.attributes.Body;
        let bodyContent = items;
  
        setAboutContent(bodyContent);
        console.log('Fetched Content:', bodyContent);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Header />
      {/* Quote Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 text-white py-5" style={{fontFamily:'Alatsi'}}>
            ABOUT US
          </h1>
        </div>
      </div>
      <div className="about-us py-5">
        <div className="container-fluid">
            <div className="container" data-wow-delay="0.1s">
              <p className="no-galle-road">{aboutContent}</p>
            </div>
          </div>
        </div>
      <div className="container-fluid about-header py-3 wow fadeIn">
        <div className="container">
          <div className="row">
            <div className="col-md-4 py-3">
              <span className="info-box text-center">50 + EMPLOYEES WORLDWIDE</span>
            </div>
            <div className="col-md-4 py-3">
              <span className="info-box text-center">12 + YEARS OF EXPERIENCE</span>
            </div>
            <div className="col-md-4 py-3">
              <span className="info-box text-center">98% SATISFIED CLIENTS</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AboutUs;
