import React, { useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Post() {
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm(e.target);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData(e.target);
        var object = {};
        formData.forEach((value, key) => (object[key] = value));
        var finalData = {};
        finalData.data = object;
        finalData = JSON.stringify(finalData);

        const apiUrl = "http://157.230.236.88:1337/api/job-posts";

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
                window.location.reload();
            } else {
                alert("Form submission failed. Please try again.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Form submission failed. Please try again later.");
            console.log(error);
        }
    };

    const validateForm = (form) => {
        const errors = {};
        const mobileNumber = form.MobileNo.value;
        const mobileNumberRegex = /^[0-9]{10}$/

        if (!form.JobRole.value) {
            errors.JobRole = "Job Role is required";
        }

        if (!form.JobType.value) {
            errors.JobType = "Job Type is required";
        }

        if (!form.FirstName.value) {
            errors.FirstName = "First Name is required";
        }

        if (!form.LastName.value) {
            errors.LastName = "Last Name is required";
        }

        if (!form.Email.value) {
            errors.Email = "Email is required";
        } else if (!isValidEmail(form.Email.value)) {
            errors.Email = "Invalid email format";
        }

        if (!mobileNumber) {
            errors.MobileNo = "Mobile Number is required";
        } else if (!mobileNumberRegex.test(mobileNumber)) {
            errors.MobileNo = "Invalid mobile number format. Please enter a 10-digit number.";
        }

        if (!form.CompanyName.value) {
            errors.CompanyName = "Company Name is required";
        }

        if (!form.CompanyWebsite.value) {
            errors.CompanyWebsite = "Company Website is required";
        }

        if (!form.JobLocation.value) {
            errors.JobLocation = "Location is required";
        }

        if (!form.Salary.value) {
            errors.Salary = "Salary is required";
        }

        if (!form.JobDescription.value) {
            errors.JobDescription = "Job Description is required";
        }

        if (!form.Responsibilities.value) {
            errors.Responsibilities = "Responsibilities are required";
        }

        if (!form.Benefits.value) {
            errors.Benefits = "Benefits are required";
        }

        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <>
            <Header />
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-2 py-5 text-white" style={{ fontFamily: 'Alatsi' }}>SUBMIT A JOB POST</h1>
                </div>
            </div>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="wow fadeInUp" data-wow-delay="0.5s">
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.JobRole ? 'is-invalid' : ''}`}
                                            id="JobRole"
                                            name="JobRole"
                                            placeholder="Job Role"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="JobRole">Job Role</label>
                                        {errors.JobRole && <div className="invalid-feedback">{errors.JobRole}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.JobType ? 'is-invalid' : ''}`}
                                            id="JobType"
                                            name="JobType"
                                            placeholder="Job Type"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="JobType">Job Type</label>
                                        {errors.JobType && <div className="invalid-feedback">{errors.JobType}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.FirstName ? 'is-invalid' : ''}`}
                                            id="FirstName"
                                            name="FirstName"
                                            placeholder="First Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="FirstName">First Name</label>
                                        {errors.FirstName && <div className="invalid-feedback">{errors.FirstName}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.LastName ? 'is-invalid' : ''}`}
                                            id="LastName"
                                            name="LastName"
                                            placeholder="Last Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="LastName">Last Name</label>
                                        {errors.LastName && <div className="invalid-feedback">{errors.LastName}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                                            id="Email"
                                            name="Email"
                                            placeholder="E-mail Address"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Email">E-mail Address</label>
                                        {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.MobileNo ? 'is-invalid' : ''}`}
                                            id="MobileNo"
                                            name="MobileNo"
                                            placeholder="Mobile Number with Country Code"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="MobileNo">Mobile Number</label>
                                        {errors.MobileNo && <div className="invalid-feedback">{errors.MobileNo}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.CompanyName ? 'is-invalid' : ''}`}
                                            id="CompanyName"
                                            name="CompanyName"
                                            placeholder="Company Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="CompanyName">Company Name</label>
                                        {errors.CompanyName && <div className="invalid-feedback">{errors.CompanyName}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.CompanyWebsite ? 'is-invalid' : ''}`}
                                            id="CompanyWebsite"
                                            name="CompanyWebsite"
                                            placeholder="Company Website"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="CompanyWebsite">Company Website</label>
                                        {errors.CompanyWebsite && <div className="invalid-feedback">{errors.CompanyWebsite}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.JobLocation ? 'is-invalid' : ''}`}
                                            id="JobLocation"
                                            name="JobLocation"
                                            placeholder="Location"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="JobLocation">Location</label>
                                        {errors.JobLocation && <div className="invalid-feedback">{errors.JobLocation}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="number"
                                            className={`form-control ${errors.Salary ? 'is-invalid' : ''}`}
                                            id="Salary"
                                            name="Salary"
                                            placeholder="Salary"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Salary">Salary</label>
                                        {errors.Salary && <div className="invalid-feedback">{errors.Salary}</div>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className={`form-control ${errors.JobDescription ? 'is-invalid' : ''}`}
                                            placeholder="Job Description"
                                            id="JobDescription"
                                            name="JobDescription"
                                            style={{ height: 130 + 'px', border: '1px solid' }}
                                        ></textarea>
                                        <label htmlFor="JobDescription">Job Description</label>
                                        {errors.JobDescription && <div className="invalid-feedback">{errors.JobDescription}</div>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className={`form-control ${errors.Responsibilities ? 'is-invalid' : ''}`}
                                            placeholder="Responsibilities"
                                            id="Responsibilities"
                                            name="Responsibilities"
                                            style={{ height: 130 + 'px', border: '1px solid' }}
                                        ></textarea>
                                        <label htmlFor="Responsibilities">Responsibilities</label>
                                        {errors.Responsibilities && <div className="invalid-feedback">{errors.Responsibilities}</div>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className={`form-control ${errors.Benefits ? 'is-invalid' : ''}`}
                                            placeholder="Benefits"
                                            id="Benefits"
                                            name="Benefits"
                                            style={{ height: 130 + 'px', border: '1px solid' }}
                                        ></textarea>
                                        <label htmlFor="Benefits">Benefits</label>
                                        {errors.Benefits && <div className="invalid-feedback">{errors.Benefits}</div>}
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button className="btn py-2 rounded-pill text-white" type="submit" style={{ background: '#111727' }}>Send Job Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Post;
