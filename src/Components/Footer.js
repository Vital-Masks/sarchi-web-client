import React from 'react';
import './style.css';
import './bootstrap.min.css';
import { useState, useEffect } from 'react';

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60); // Update the year every minute (you can adjust the interval)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* Footer Start */}
      <div className="footer-style page-footer wow fadeIn">
        <div className="custom-container py-5">
          <div className="row">
            <div className="col-sm-8">
              <h1
                className="display-2 py-5 text-white"
                style={{ fontSize: '35px', fontFamily: 'Alatsi' }}
              >
                HERE TO HELP YOUR EVERY BUSINESS NEED
              </h1>
            </div>
            <div className="col-sm-4 py-5 text-center">
              <a
                href="/contact"
                className="btn py-2 rounded-pill text-black"
                type="submit"
                style={{
                  background: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="copyright-style copyright py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
             
              <div className="fw-medium text-light">
      Copyright &copy; {currentYear} . All Right Reserved.
    </div>
              
            </div>
            <div className="col-md-6 text-center text-md-end">
              {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
              Designed By{' '}
              <a className="fw-medium text-light" href="https://vitalmasks.lk">
                Vital Masks
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}
    </>
  );
}

export default Footer;
