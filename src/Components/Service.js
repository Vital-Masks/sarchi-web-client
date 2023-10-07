import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from './utils.json';
function Service() {
  const [expertiseData, setExpertiseData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios.get(URL.BASE_URL+'/api/discipline-and-expertises?populate=*')
      .then((response) => {
        setExpertiseData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data from Strapi:', error);
      });
  }, []);
  return (
    <>
    <div className="container-fluid">
    <h1 className="display-6 mb-4" style={{fontFamily:'Alatsi'}}>SERVICES WE OFFER</h1>
      <div className="main mb-5">
        <ul className="cards"> 
          {Array.isArray(expertiseData) && expertiseData.length > 0 ? (
            expertiseData.map((item, index) => (
              <li className="cards_item" key={index}>
                <div className="card">
                  <div className="card_image">
                  <img src={URL.BASE_URL+item.attributes.Ref_Media.data.attributes.formats.small.url} alt={item.attributes.Expertise_Name}/>
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{item.attributes.Expertise_Name}</h2>
                    <p className="card_text">{item.attributes.Description}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
  <div className="col-12 text-center">
                            <a href="/disciplines" className="btn py-2 rounded-pill text-white" type="submit" style={{background:'#111727'}}>View More</a>
                        </div></div></div>

    </>
  );
}

export default Service;