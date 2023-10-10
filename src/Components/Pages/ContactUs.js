import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(e.target);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));
    // var json = JSON.stringify(object);
    console.log(object);
    var finalData = {};
    finalData.data = object;
    finalData = JSON.stringify(finalData);

    // Construct the API endpoint URL for your Strapi server
    const apiUrl = URL.BASE_URL + '/api/feedback-inquiries'; // Update with your API endpoint

    try {
      // Make an HTTP POST request to Strapi API
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: finalData,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: `Submitted Successfully.`,
          showConfirmButton: false,
          timer: 2000,
        });
        e.target.reset(); // Reset the form after successful submission
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Form Submission Failed',
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Form Submission Failed',
        showConfirmButton: true,
      });
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1
            className="display-2 text-white py-3"
            style={{ marginTop: '25px', fontFamily: 'Alatsi' }}
          >
            CONTACT US
          </h1>
        </div>
      </div>
      <div className=" py-5">
        <div className="custom-container">
          <div className="row g-5">
            <div className="wow fadeInUp" data-wow-delay="0.5s">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="container col-sm-12 text-center mb-5">
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
                  <div className="container-fluid py-3 wow fadeIn">
                    <div className="container py-2">
                      <div className="row">
                        <div className="col-md-6 py-2">
                          <span
                            className=" text-center"
                            style={{
                              fontFamily: 'Alatsi',
                              fontSize: '25px',
                              fontWeight: '300',
                            }}
                          >
                            Email : info@satchiuk.com / consultant@satchiuk.com
                          </span>
                        </div>
                        <div className="col-md-6 py-2">
                          <span
                            className="text-center"
                            style={{
                              fontFamily: 'Alatsi',
                              fontSize: '25px',
                              fontWeight: '300',
                            }}
                          >
                            Phone : +44 02037 325 1388 / +44 07596 519 6045
                          </span>
                        </div>
                      </div>
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
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="Name"
                      placeholder="Your Name"
                      style={{ border: '1px solid' }}
                    ></input>
                    <label for="name">Your Name</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      name="CompanyName"
                      placeholder="Company Name"
                      style={{ border: '1px solid' }}
                    ></input>
                    <label for="company">Company Name</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="mail"
                      name="Email"
                      placeholder="Your Email"
                      style={{ border: '1px solid' }}
                    ></input>
                    <label for="mail">Your Email</label>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control"
                      id="mobile"
                      name="MobileNo"
                      placeholder="Telephone"
                      style={{ border: '1px solid' }}
                    ></input>
                    <label for="mobile">Telephone</label>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="Message"
                      placeholder="Leave a message here"
                      id="message"
                      style={{ height: 130 + 'px', border: '1px solid' }}
                    ></textarea>
                    <label for="message">Message</label>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button
                    className="btn py-2 rounded-pill text-white"
                    type="submit"
                    style={{ background: '#111727', height: '50px' }}
                  >
                    Send Form
                  </button>
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

export default ContactUs;
