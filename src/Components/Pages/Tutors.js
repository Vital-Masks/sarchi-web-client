import React, { useState, useEffect, Link } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

function Tutor() {
  const [tutorData, setTutorData] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios
      .get(URL.BASE_URL + '/api/tutors?populate=*')
      .then((response) => {
        setTutorData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function downloadFile(e, fileUrl) {
    e.preventDefault(); // Prevent the default behavior of the anchor tag
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = "_blank"; // Open the link in a new tab to trigger the download
    link.setAttribute('download', true); // Set the download attribute to trigger the download
  
    // Simulate a click event to trigger the download
    if (document.createEvent) {
      const event = document.createEvent("MouseEvents");
      event.initEvent("click", true, true);
      link.dispatchEvent(event);
    } else {
      link.click();
    }
  }
  


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
            TUTORS
          </h1>
        </div>
      </div>
      <div className="tutor py-5 mb-5">
        <div className="custom-container">
          <div className="row g-5">
            {Array.isArray(tutorData) && tutorData.length > 0 ? (
              tutorData.map((item, index) => (
                <div
                  className="col-12 wow fadeInUp"
                  data-wow-delay="0.1s"
                  key={index}
                >
                  <h2 style={{ fontWeight: 'bold', fontFamily: 'Poppins' }}>
                    {item.attributes.Tutor_Name}
                  </h2>
                  <p
                    style={{
                      color: '#878787',
                      fontSize: '24px',
                      fontFamily: 'Poppins',
                    }}
                  >
                    {item.attributes.Tutor_Designation}
                  </p>
                  <p className="no-galle-road">{item.attributes.Description}</p>
                  <div className="mb-2">
                   
                          <p
                            style={{
                              color: '#878787',
                              fontSize: '24px',
                              fontFamily: 'Alatsi'
                            }}
                          >
                            Companies Trained By {item.attributes.Tutor_Name}:
                          </p>
                        <div>
                          {Array.isArray(
                            item.attributes.Company_Trained.data
                          ) &&
                          item.attributes.Company_Trained.data.length > 0 ? (
                            item.attributes.Company_Trained.data.map(
                              (company, companyIndex) => (
                                <img
                                  key={companyIndex}
                                  src={URL.BASE_URL + company.attributes.url}
                                  style={{ height: '100px', width: '200px',margin:'10px'}}
                                  alt={item.attributes.Tutor_Name}
                                />
                              )
                            )
                          ) : (
                            <p
                              style={{
                                color: '#878787',
                                fontSize: '24px',
                                fontFamily: 'Alatsi',
                              }}
                            >
                              No companies trained by{' '}
                              {item.attributes.Tutor_Name} available.
                            </p>
                          )}
                          </div>
                          <div className="py-5">
                          {Array.isArray(
                            item.attributes.Ref_Media.data
                          ) &&
                          item.attributes.Ref_Media.data.length > 0 ? (
                            item.attributes.Ref_Media.data.map(
                              (media, mediaIndex) => (
                                <a
                                  href={URL.BASE_URL + media.attributes.url}
                                  key={mediaIndex}
                                  className="rounded-pill py-3 px-3 text-white"
                                  style={{ background: '#111727', border: '2px solid white',margin:'10px',height:'50px' }}
                                  onClick={(e) => downloadFile(e, URL.BASE_URL + media.attributes.url)}
                                >
                                  Download Guide
                                </a>                             
                              )
                            )
                          ) : (
                            
                            <p
                              style={{
                                color: '#878787',
                                fontSize: '24px',
                                fontFamily: 'Alatsi',
                              }}
                            >
                              No companies trained by{' '}
                              {item.attributes.Tutor_Name} available.
                            </p>
                          )}
                        </div>
                      </div>
                  <div
                    className="rectangle"
                    style={{
                      backgroundColor: '#14141433',
                      border: '0.5px solid',
                      borderColor: '#707070',
                      height: '2px',
                      opacity: 0.5,
                    }}
                  />
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
