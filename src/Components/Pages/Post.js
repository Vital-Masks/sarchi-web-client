import React, { useState } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

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

        const apiUrl = URL.BASE_URL+"/api/job-posts";

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
        const mobileNumber = form.Mobile_No.value;
        const mobileNumberRegex = /^(?:\+\d{1,3}\s?)?[0-9]{10}$/;


        if (!form.Job_Role.value) {
            errors.Job_Role = "Job Role is required";
        }

        if (!form.Job_Type.value) {
            errors.Job_Type = "Job Type is required";
        }

        if (!form.First_Name.value) {
            errors.First_Name = "First Name is required";
        }

        if (!form.Last_Name.value) {
            errors.Last_Name = "Last Name is required";
        }

        if (!form.Email.value) {
            errors.Email = "Email is required";
        } else if (!isValidEmail(form.Email.value)) {
            errors.Email = "Invalid email format";
        }

        if (!mobileNumber) {
            errors.Mobile_No = "Mobile Number is required";
        } else if (!mobileNumberRegex.test(mobileNumber)) {
            errors.Mobile_No = "Invalid mobile number format. Please enter a 10-digit number.";
        }

        if (!form.Company_Name.value) {
            errors.Company_Name = "Company Name is required";
        }

        if (!form.Company_Website.value) {
            errors.Company_Website = "Company Website is required";
        }

        if (!form.Job_Location.value) {
            errors.Job_Location = "Location is required";
        }

        if (!form.Salary.value) {
            errors.Salary = "Salary is required";
        }

        if (!form.Job_Description.value) {
            errors.Job_Description = "Job Description is required";
        }

        if (!form.Responsibilities.value) {
            errors.Responsibilities = "Responsibilities are required";
        }

        if (!form.Beneifts.value) {
            errors.Beneifts = "Beneifts are required";
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
                                            className={`form-control ${errors.Job_Role ? 'is-invalid' : ''}`}
                                            id="Job_Role"
                                            name="Job_Role"
                                            placeholder="Job Role"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Job_Role">Job Role</label>
                                        {errors.Job_Role && <div className="invalid-feedback">{errors.Job_Role}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.Job_Type ? 'is-invalid' : ''}`}
                                            id="Job_Type"
                                            name="Job_Type"
                                            placeholder="Job Type"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Job_Type">Job Type</label>
                                        {errors.Job_Type && <div className="invalid-feedback">{errors.Job_Type}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.First_Name ? 'is-invalid' : ''}`}
                                            id="First_Name"
                                            name="First_Name"
                                            placeholder="First Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="First_Name">First Name</label>
                                        {errors.First_Name && <div className="invalid-feedback">{errors.First_Name}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.Last_Name ? 'is-invalid' : ''}`}
                                            id="Last_Name"
                                            name="Last_Name"
                                            placeholder="Last Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Last_Name">Last Name</label>
                                        {errors.Last_Name && <div className="invalid-feedback">{errors.Last_Name}</div>}
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
                                            className={`form-control ${errors.Mobile_No ? 'is-invalid' : ''}`}
                                            id="Mobile_No"
                                            name="Mobile_No"
                                            placeholder="Mobile Number with Country Code"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Mobile_No">Mobile Number (With Country Code)</label>
                                        {errors.Mobile_No && <div className="invalid-feedback">{errors.Mobile_No}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.Company_Name ? 'is-invalid' : ''}`}
                                            id="Company_Name"
                                            name="Company_Name"
                                            placeholder="Company Name"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Company_Name">Company Name</label>
                                        {errors.Company_Name && <div className="invalid-feedback">{errors.Company_Name}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.Company_Website ? 'is-invalid' : ''}`}
                                            id="Company_Website"
                                            name="Company_Website"
                                            placeholder="Company Website"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Company_Website">Company Website</label>
                                        {errors.Company_Website && <div className="invalid-feedback">{errors.Company_Website}</div>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className={`form-control ${errors.Job_Location ? 'is-invalid' : ''}`}
                                            id="Job_Location"
                                            name="Job_Location"
                                            placeholder="Location"
                                            style={{ border: '1px solid' }}
                                        />
                                        <label htmlFor="Job_Location">Location</label>
                                        {errors.Job_Location && <div className="invalid-feedback">{errors.Job_Location}</div>}
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
                                            className={`form-control ${errors.Job_Description ? 'is-invalid' : ''}`}
                                            placeholder="Job Description"
                                            id="Job_Description"
                                            name="Job_Description"
                                            style={{ height: 130 + 'px', border: '1px solid' }}
                                        ></textarea>
                                        <label htmlFor="Job_Description">Job Description</label>
                                        {errors.Job_Description && <div className="invalid-feedback">{errors.Job_Description}</div>}
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
                                            className={`form-control ${errors.Beneifts ? 'is-invalid' : ''}`}
                                            placeholder="Beneifts"
                                            id="Beneifts"
                                            name="Beneifts"
                                            style={{ height: 130 + 'px', border: '1px solid' }}
                                        ></textarea>
                                        <label htmlFor="Beneifts">Beneifts</label>
                                        {errors.Beneifts && <div className="invalid-feedback">{errors.Beneifts}</div>}
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
