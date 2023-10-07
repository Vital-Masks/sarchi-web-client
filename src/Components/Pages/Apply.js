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
    const mobileNumberRegex = /^(?:\+\d{1,3}\s?)?[0-9]{10}$/;


    if (!formData.Job_Role) {
      errors.Job_Role = 'Job Role is required';
    }

    if (!formData.Job_Type) {
      errors.Job_Type = 'Job Type is required';
    }

    if (!formData.First_Name) {
      errors.First_Name = 'First Name is required';
    }

    if (!formData.Last_Name) {
      errors.Last_Name = 'Last Name is required';
    }

    if (!formData.Email) {
      errors.Email = 'Email is required';
    } else if (!isValidEmail(formData.Email)) {
      errors.Email = 'Invalid email format';
    }

    if (!formData.Mobile_No) {
      errors.Mobile_No = "Mobile Number is required";
  } else if (!mobileNumberRegex.test(formData.Mobile_No)) {
      errors.Mobile_No = "Invalid mobile number format. Please enter a 10-digit number.";
  }

    if (!formData.Visa_Status) {
      errors.Visa_Status = 'Visa Status is required';
    }

    if (!formData.Github_URL) {
      errors.Github_URL = 'Github URL is required';
    }

    if (!formData.LinkedIn_URL) {
      errors.LinkedIn_URL = 'LinkedIn URL is required';
    }

    if (!formData.Notice_Period) {
      errors.Notice_Period = 'Notice Period is required';
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

      //   const fileUploadUrl = URL.BASE_URL + "/api/upload";

      // const fileUploadResponse = await fetch(fileUploadUrl, {
      //   mode: 'no-cors',
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     "Accept": "application/json",
      //     "type": "formData"
      //   },
      //   body: formData, // This will include the files for "Cover_Letter" and "Resume"
      // });

      // if (!fileUploadResponse.ok) {
      //   alert("File upload failed. Please try again.");
      //   return;
      // }

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
            <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>{jobData.attributes.Job_Role}</h1>
        </div>
    </div>)}
    {jobData && (
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="wow fadeInUp" data-wow-delay="0.5s">
                <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Job_Role ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="Job_Role"
              name="Job_Role"
              placeholder="Expected Job Role"
              style={{ border: '1px solid' }}
              value={jobData.attributes.Job_Role}
            ></input>
            <label htmlFor="Job_Role">Job Role</label>
            {formErrors.Job_Role && <div className="error-message">{formErrors.Job_Role}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Job_Type ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="Job_Type"
              name="Job_Type"
              placeholder="Expected Job Type"
              style={{ border: '1px solid' }}
              value={jobData.attributes.Type_Of_Jobs}
            ></input>
            <label htmlFor="Job_Type">Job Type</label>
            {formErrors.Job_Type && <div className="error-message">{formErrors.Job_Type}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.First_Name ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="First_Name"
              name="First_Name"
              placeholder="First Name"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="First_Name">First Name</label>
            {formErrors.First_Name && <div className="error-message">{formErrors.First_Name}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Last_Name ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="Last_Name"
              name="Last_Name"
              placeholder="Last Name"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Last_Name">Last Name</label>
            {formErrors.Last_Name && <div className="error-message">{formErrors.Last_Name}</div>}
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
          <div className={`form-floating ${formErrors.Mobile_No ? 'has-error' : ''}`}>
            <input
              type="tel"
              className="form-control"
              id="Mobile_No"
              name="Mobile_No"
              placeholder="Your mobile number with country code"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Mobile_No">Mobile Number (With Country Code)</label>
            {formErrors.Mobile_No && <div className="error-message">{formErrors.Mobile_No}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Visa_Status ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="Visa_Status"
              name="Visa_Status"
              placeholder="Visa Status"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Visa_Status">Visa Status</label>
            {formErrors.Visa_Status && <div className="error-message">{formErrors.Visa_Status}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Github_URL ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="Github_URL"
              name="Github_URL"
              placeholder="Portfolio/Github URL"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Github_URL">Portfolio/Github URL</label>
            {formErrors.Github_URL && <div className="error-message">{formErrors.Github_URL}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.LinkedIn_URL ? 'has-error' : ''}`}>
            <input
              type="text"
              className="form-control"
              id="LinkedIn_URL"
              name="LinkedIn_URL"
              placeholder="LinkedIn URL"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="LinkedIn_URL">LinkedIn URL</label>
            {formErrors.LinkedIn_URL && <div className="error-message">{formErrors.LinkedIn_URL}</div>}
          </div>
        </div>
        <div className="col-sm-6">
          <div className={`form-floating ${formErrors.Notice_Period ? 'has-error' : ''}`}>
            <input
              type="number"
              className="form-control"
              id="Notice_Period"
              name="Notice_Period"
              placeholder="Notice Period (In Months)"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Notice_Period">Notice Period (In Months)</label>
            {formErrors.Notice_Period && <div className="error-message">{formErrors.Notice_Period}</div>}
          </div>
        </div>
        <div className="col-sm-12">
          
          <div className="form">
            <input
              type="file"
              className={`form-control ${formErrors.Cover_Letter ? 'has-error' : ''}`}
              id="Cover_Letter"
              name="Cover_Letter"
              style={{ border: '1px solid' }}
            ></input>
            <label htmlFor="Cover_Letter">Cover Letter</label>
            {formErrors.Cover_Letter && <div className="error-message">{formErrors.Cover_Letter}</div>}
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