import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

function Sectors() {
  const [consultantData, setConsultantData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios
      .get(URL.BASE_URL + '/api/consultancy-partners')
      .then((response) => {
        setConsultantData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1
            className="display-2 py-5 text-white"
            style={{ fontFamily: 'Alatsi' }}
          >
            CONSULTANTS
          </h1>
        </div>
      </div>
      <div className=" py-5">
        <div className="custom-container">
          <div className="row g-5">
            {Array.isArray(consultantData) && consultantData.length > 0 ? (
              consultantData.map((item, index) => (
                <div
                  className="col-12 wow fadeInUp"
                  data-wow-delay="0.1s"
                  key={index}
                >
                  <p
                    style={{
                      color: '#1e1e1e',
                      fontFamily: '"Alatsi-Regular", Helvetica',
                      fontSize: '30px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.attributes.Partners_Category}
                  </p>
                  <p
                    className="no-galle-road"
                    style={{ fontFamily: 'Poppins' }}
                  >
                    {item.attributes.Description}
                  </p>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Sectors;
