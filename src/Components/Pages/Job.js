import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios'; // Import Axios or your preferred HTTP library
import URL from '../../Components/utils.json';

function Job() {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    // Fetch job data using jobId
    axios.get(URL.BASE_URL+`/api/post-job-vaccancies/${jobId}`)
      .then((response) => {
        setJobData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, [jobId]);

  return (
    <>
      <Header />
      {jobData && (
        <div className="container-fluid job-page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container py-3 text-center ">
            <h1 className="display-2 py-2 text-white" style={{fontFamily:'Alatsi'}}>
              {jobData.attributes.Job_Role.toUpperCase()}
            </h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex flex-wrap mb-4" style={{fontFamily:'Poppins'}}>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-2"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      height:'40px',
                      background: '#ebff9d',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Location}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-2"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      
                      height:'40px',
                      marginTop: '05px',
                      background: '#9effe2',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Min_Salary}K$ - {jobData.attributes.Max_Salary}K$
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-2"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      height:'40px',
                      background: '#ffb0b0',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Timings}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-2"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      height:'40px',
                      background: '#f098ff',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Experience_Levels}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-2"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      height:'40px',
                      background: '#67b6ff',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Type_Of_Jobs}
                  </p>
                </div>
                <div className="col-12 text-center">
                  <a
                    href={`/apply/${jobData.id}`} 
                    className="btn py-2 rounded-pill text-black px-3"
                    type="submit"
                    style={{ background: 'white', fontWeight: 'bold' }}
                  >
                    Apply for Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jobData && (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>JOB DESCRIPTION</p>
          <p className="no-galle-road"> 
          {jobData.attributes.Job_Description}
        </p><br></br>
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>KEY RESPONSIBILITIES</p>
          <p className="no-galle-road"> 
          {jobData.attributes.Key_Responsibilities}
        </p><br></br>
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>SKILLS AND EXPERIENCE</p>
          <p className="no-galle-road">
          {jobData.attributes.Skills_And_Experience}
        </p><br></br>
        </div>
        
            </div>
        </div>
        </div> )}
      <Footer />
    </>
  );
}

export default Job;
