import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios'; // Import Axios or your preferred HTTP library

function Job() {
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    // Fetch job data using jobId
    axios.get(`http://157.230.236.88:1337/api/post-job-vaccancies/${jobId}`)
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
        <div className="container-fluid page-header py-5 mb-3 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-3">
            <h1 className="display-2 py-2 text-white" style={{fontFamily:'Alatsi'}}>
              {jobData.attributes.JobRole}
            </h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex flex-wrap mb-2" style={{fontFamily:'Poppins'}}>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-1"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      background: '#ebff9d',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Location}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-1"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      background: '#9effe2',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.MinSalary}K$ - {jobData.attributes.MaxSalary}K$
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-1"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      background: '#ffb0b0',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.Timings}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-1"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      background: '#f098ff',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.ExperienceLevels}
                  </p>
                  <p
                    className="search rounded-pill text-black mr-2 mb-2 py-1"
                    style={{
                      marginLeft: '10px',
                      fontSize: '15px',
                      marginTop: '05px',
                      background: '#67b6ff',
                      width: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {jobData.attributes.TypeOfJobs}
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
          {jobData.attributes.JobDescription}
        </p><br></br>
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>KEY RESPONSIBILITIES</p>
          <p className="no-galle-road"> 
          {jobData.attributes.KeyResponsibilities}
        </p><br></br>
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>SKILLS AND EXPERIENCE</p>
          <p className="no-galle-road">
          {jobData.attributes.SkillsAndExperience}
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
