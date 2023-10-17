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

  const replaceNewlinesWithBreaks= (text) =>{
    return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  }

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
                
              </div>
            </div>
          </div>
        </div>
      )}
      {jobData && (
    <div className="custom-container py-5">
  
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
        <div>
  <p style={{ color: '#1e1e1e', fontFamily: 'Alatsi-Regular, Helvetica', fontSize: '30px', fontWeight: 400 }}>Job Description</p>
  <div className="no-galle-road" dangerouslySetInnerHTML={replaceNewlinesWithBreaks(jobData.attributes.Job_Description)}></div>
  <br></br>

  <p style={{ color: '#1e1e1e', fontFamily: 'Alatsi-Regular, Helvetica', fontSize: '30px', fontWeight: 400 }}>KEY RESPONSIBILITIES</p>
  <div className="no-galle-road" dangerouslySetInnerHTML={replaceNewlinesWithBreaks(jobData.attributes.Key_Responsibilities)}></div>
  <br></br>
  <p style={{ color: '#1e1e1e', fontFamily: 'Alatsi-Regular, Helvetica', fontSize: '30px', fontWeight: 400 }}>Benefits</p>
  <div className="no-galle-road" dangerouslySetInnerHTML={replaceNewlinesWithBreaks(jobData.attributes.Skills_And_Experience)}></div>
</div>


        <br></br>
        <div className="col-12 text-center">
                  <a
                    href={`/apply/${jobData.id}`} 
                    className="btn py-2 rounded-pill text-white px-3"
                    type="submit"
                    style={{ background: 'black', fontWeight: 'bold' }}
                  >
                    Apply for Job
                  </a>
                </div>
        </div>
        
            </div>
         )}
      <Footer />
    </>
  );
}

export default Job;
