import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from './utils.json';
function Service() {
  const [expertiseData, setExpertiseData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios
      .get(URL.BASE_URL + '/api/discipline-and-expertises?populate=*')
      .then((response) => {
        setExpertiseData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data from Strapi:', error);
      });
  }, []);
  return (
    <>
      <div className="custom-container">
        <h1 className="display-6 py-5" style={{ fontFamily: 'Alatsi' }}>
          SERVICES WE OFFER
        </h1>
        <div className="main mb-5">
          <ul className="cards mb-5">
            {Array.isArray(expertiseData) && expertiseData.length > 0 ? (
              expertiseData.slice(0, 6).map((item, index) => (
                <li className="cards_item" key={index}>
                  <div className="card">
                    <div className="card_image">
                      <img
                        src={
                          URL.BASE_URL +
                          item.attributes.Ref_Media.data.attributes.url
                        }
                        style={{ height: '325px', width: '500px' }}
                        alt={item.attributes.Expertise_Name}
                      />
                    </div>
                    <div className="card_content">
                      <h2 className="card_title py-3">
                        {item.attributes.Expertise_Name.toUpperCase()}
                      </h2>
                      <p
                        className="card_text"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        {item.attributes.Description}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No data available</p>
            )}
          </ul>
          <div className="col-12 text-center">
            <a
              href="/disciplines"
              className="btn py-2 mb-5 rounded-pill text-white"
              type="submit"
              style={{ background: '#111727', height: '40px' }}
            >
              View More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
