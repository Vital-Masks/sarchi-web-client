import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';
 

function Tutor() {
  const [tutorData, setTutorData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios.get(URL.BASE_URL+'/api/tutors?populate=*')
      .then((response) => {
        setTutorData(response.data.data);
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
            <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>TUTORS</h1>
        </div>
    </div>
      <div className="tutor py-5 mb-5">
    <div className="container">
      <div className="row g-5">
      {Array.isArray(tutorData) && tutorData.length > 0 ? (
            tutorData.map((item, index) => (
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s" key={index}>
        <h2 style={{fontWeight:'bold',fontFamily:'Poppins'}}>{item.attributes.Tutor_Name}</h2>
        <p style={{color:'#878787',fontSize:'24px',fontFamily:'Poppins'}}>{item.attributes.Tutor_Designation}</p>
          <p className="no-galle-road"> 
          {item.attributes.Description}
        </p>
        <div className="container">
        <div className='row'>
        <div className='col-md-5 py-3'>
        <div className="col-md-12 mb-2">
            <p style={{color:'#878787',fontSize:'24px',fontFamily:'Alatsi',marginLeft:'-45px'}}>Companies Trained By {item.attributes.Tutor_Name}:</p>
            </div>
        </div>
        <div className="col-md-7 py-3">
        <div className="col-md-12 mb-2">  
                      {Array.isArray(item.attributes.Company_Trained.data) &&
                        item.attributes.Company_Trained.data.length > 0 ? (
                          item.attributes.Company_Trained.data.map((company, companyIndex) => (
                            <img
                              key={companyIndex}
                              src={URL.BASE_URL+company.attributes.url}
                              style={{ height: '100px', width: '200px' }}
                              alt={item.attributes.Tutor_Name}
                            />
                          ))
                        ) : (
                          <p style={{color:'#878787',fontSize:'24px',fontFamily:'Alatsi'}}>No companies trained by {item.attributes.Tutor_Name} available.</p>
                        )}
        </div></div>
        </div></div>
        <div className="rectangle" style={{backgroundColor: '#14141433',border: '0.5px solid',borderColor: '#707070',height: '2px',opacity: 0.5}}/>
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

export default Tutor;
