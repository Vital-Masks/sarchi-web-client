import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

function Discipline() {
  const [expertiseData, setExpertiseData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios.get(URL.BASE_URL+'/api/discipline-and-expertises?populate=*')
      .then((response) => {
        setExpertiseData(response.data.data);
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
          <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>OUR DISCIPLINES AND EXPERTISE</h1>
        </div>
      </div>
      <div className="main mb-5">
        <ul className="cards"> 
          {Array.isArray(expertiseData) && expertiseData.length > 0 ? (
            expertiseData.map((item, index) => (
              <li className="cards_item" key={index}>
                <div className="card">
                  <div className="card_image">
                    <img src={URL.BASE_URL+item.attributes.Ref_Media.data.attributes.url}  style={{height:'325px',width:'500px'}} alt={item.attributes.Expertise_Name}/>
                  </div>
                  <div className="card_content">
                    <h2 className="card_title py-3" style={{fontFamily:'Alatsi'}}>{item.attributes.Expertise_Name.toUpperCase()}</h2>
                    <p className="card_text" style={{fontFamily:'Poppins'}}>{item.attributes.Description}</p>
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

export default Discipline;
