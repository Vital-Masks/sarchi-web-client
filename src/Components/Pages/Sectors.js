import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

function Sectors() {
  const [sectorData, setSectorData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios.get(URL.BASE_URL+'/api/sectors?populate=*')
      .then((response) => {
        setSectorData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

      
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>SECTORS WE COVER</h1>
        </div>
      </div>
      <div className="main mb-5">
        <ul className="cards"> 
          {Array.isArray(sectorData) && sectorData.length > 0 ? (
            sectorData.map((item, index) => (
              <li className="cards_item" key={index}>
                <div className="card">
                  <div className="card_image">
                      <img src={URL.BASE_URL+item.attributes.RefMedia.data.attributes.url} style={{height:'325px',width:'500px'}}  alt={item.attributes.Sector_Name}/>
                  </div>
                  <div className="card_content">
                    <h2 className="card_title py-3">{item.attributes.Sector_Name.toUpperCase()}</h2>
                    <p className="card_text">{item.attributes.Description}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Sectors;
