import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import axios from 'axios'; 
import URL from '../../Components/utils.json';

function Apply() {
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
  const [formErrors, setFormErrors] = useState({});
 
  const validateForm = (formData) => {
    const errors = {};
    const mobileNumberRegex = /^[0-9]{10}$/

    if (!formData.JobRole) {
      errors.JobRole = 'Job Role is required';
    }

    if (!formData.JobType) {
      errors.JobType = 'Job Type is required';
    }

    if (!formData.FirstName) {
      errors.FirstName = 'First Name is required';
    }

    if (!formData.LastName) {
      errors.LastName = 'Last Name is required';
    }

    if (!formData.Email) {
      errors.Email = 'Email is required';
    } else if (!isValidEmail(formData.Email)) {
      errors.Email = 'Invalid email format';
    }

    if (!formData.MobileNo) {
      errors.MobileNo = "Mobile Number is required";
  } else if (!mobileNumberRegex.test(formData.MobileNo)) {
      errors.MobileNo = "Invalid mobile number format. Please enter a 10-digit number.";
  }

    if (!formData.VisaStatus) {
      errors.VisaStatus = 'Visa Status is required';
    }

    if (!formData.GithubURL) {
      errors.GithubURL = 'Github URL is required';
    }

    if (!formData.LimkedInURL) {
      errors.LimkedInURL = 'LinkedIn URL is required';
    }

    if (!formData.NoticePeriod) {
      errors.NoticePeriod = 'Notice Period is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    console.log(object);
    var finalData = {};
    finalData.data = object;
    finalData = JSON.stringify(finalData);

    // Validate the form
    const isFormValid = validateForm(object);

    if (isFormValid) {
      const apiUrl = URL.BASE_URL+"/api/applied-jobs";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          body: finalData,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          e.target.reset();
          window.location.href = 'http://localhost:3000/';
          setFormErrors({});
        } else {
          alert("Form submission failed. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Form submission failed. Please try again later.");
        console.log(error);
      }
    }
  };
  return (
    <>
      <Header />
      {jobData && (
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
            <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>{jobData.attributes.JobRole}</h1>
        </div>
    </div>)}
    {jobData && (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="wow fadeInUp" data-wow-delay="0.5s">
                <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.JobRole ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="JobRole"
              name="JobRole"
              placeholder="Expected Job Role"
              style={{ border: '1px solid' }}
              value={jobData.attributes.JobRole}
            ></input>
            <label htmlFor="JobRole">Job Role</label>
            {formErrors.JobRole && <div className="error-message">{formErrors.JobRole}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.JobType ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="JobType"
              name="JobType"
              placeholder="Expected Job Type"
              style={{ border: '1px solid' }}
              value={jobData.attributes.TypeOfJobs}
            ></input>
            <label htmlFor="JobType">Job Type</label>
            {formErrors.JobType && <div className="error-message">{formErrors.JobType}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.FirstName ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="FirstName"
              name="FirstName"
              placeholder="First Name"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="FirstName">First Name</label>
            {formErrors.FirstName && <div className="error-message">{formErrors.FirstName}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.LastName ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="LastName"
              name="LastName"
              placeholder="Last Name"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="LastName">Last Name</label>
            {formErrors.LastName && <div className="error-message">{formErrors.LastName}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Email ? 'has-error' : ''}`}>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="Email"
              placeholder="Your Email"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Email">Your Email</label>
            {formErrors.Email && <div className="error-message">{formErrors.Email}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.MobileNo ? 'has-error' : ''}`}>
            <input
              type="tel"
              className="form-control"
              id="MobileNo"
              name="MobileNo"
              placeholder="Your mobile number with country code"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="MobileNo">Mobile Number</label>
            {formErrors.MobileNo && <div className="error-message">{formErrors.MobileNo}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.VisaStatus ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="VisaStatus"
              name="VisaStatus"
              placeholder="Visa Status"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="VisaStatus">Visa Status</label>
            {formErrors.VisaStatus && <div className="error-message">{formErrors.VisaStatus}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.GithubURL ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="GithubURL"
              name="GithubURL"
              placeholder="Portfolio/Github URL"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="GithubURL">Portfolio/Github URL</label>
            {formErrors.GithubURL && <div className="error-message">{formErrors.GithubURL}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.LimkedInURL ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="LimkedInURL"
              name="LimkedInURL"
              placeholder="LinkedIn URL"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="LimkedInURL">LinkedIn URL</label>
            {formErrors.LimkedInURL && <div className="error-message">{formErrors.LimkedInURL}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.NoticePeriod ? 'has-error' : ''}`}>
            <input
              type="number"
              className="form-control"
              id="NoticePeriod"
              name="NoticePeriod"
              placeholder="Notice Period (In Months)"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="NoticePeriod">Notice Period</label>
            {formErrors.NoticePeriod && <div className="error-message">{formErrors.NoticePeriod}</div>}
          </div>
        </div>
        <div className="col-sm-12">
          
          <div className="form">
            <input
              type="file"
              className={`form-control ${formErrors.CoverLetter ? 'has-error' : ''}`}
              id="CoverLetter"
              name="CoverLetter"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="CoverLetter">Cover Letter</label>
            {formErrors.CoverLetter && <div className="error-message">{formErrors.CoverLetter}</div>}
          </div>
        </div>
        <div className="col-sm-12">
          
          <div className="form">
            <input
              type="file"
              className={`form-control ${formErrors.Resume ? 'has-error' : ''}`}
              id="Resume"
              name="Resume"
              style={{ border: '1px solid'}}
            ></input>
            <label htmlFor="Resume">Resume</label>
            {formErrors.Resume && <div className="error-message">{formErrors.Resume}</div>}
          </div>
        </div>
        <div className="col-12 text-center">
          <button className="btn py-2 rounded-pill text-white" type="submit" style={{ background: '#111727' }}>Apply for Job</button>
        </div>
      </form>
                   
                </div>
            </div>
        </div>
    </div>)}
      <Footer />
    </>
  );
}

export default Apply;
