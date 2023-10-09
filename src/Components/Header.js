import React from "react";
import "./style.css";
import "./bootstrap.min.css";
import logoImg from './satchi.png'

function Header() {
  return (
    <>
  
  <div className="header text-black d-none d-lg-flex">
    <div className="container py-4">
      <div className="d-flex align-items-center">
        <div ms-auto d-flex align-items-left>
        <small className="ms-4">
            <i className="fa fa-map-marker-alt me-3" />
            79 Stone Cellar Road,London,UK.
          </small>
        </div>
        <div className="ms-auto d-flex align-items-center">
          <small className="ms-4">
            <i className="fa fa-phone-alt me-3" />
            +44 0203 325 1388
          </small>
          <div className="rectangle-22" />
          <small className="ms-4">
            <i className="fa fa-envelope me-3" />
            info@satchiuk.com
          </small>
        </div>
      </div>
    </div>
  </div>
  <div className="header-2 sticky-top" style={{background:'#111727',fontSize:'25px'}}>
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light p-lg-0">
      <a href="/">
      <img className="logoImage" src={logoImg}/>
        </a>
        <button
          type="button"
          className="navbar-toggler me-0"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          style={{background:'white'}}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse" >
          <div className="ms-auto navbar-nav" >
            <a href="/" className="nav-item nav-link text-white active"> 
              Home
            </a>
            <div className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle text-white "
                data-bs-toggle="dropdown" 
              >
                Job Seekers
              </a>
              <div className="dropdown-menu rounded-0 rounded-bottom m-0" style={{background:'#111727',fontFamily:'Poppins',fontSize:'24px' }}>
                <a href="/vacancies" className="dropdown-item text-white" style={{background:'#111727'}}>
                  Vacancies
                </a>
                <a href="/enrol-job" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Enroll for any Job
                </a>
                <a href="/interview-techniques" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Interview Techniques
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle text-white "
                data-bs-toggle="dropdown" 
              >
                Employers
              </a>
              <div className="dropdown-menu rounded-0 rounded-bottom m-0" style={{background:'#111727',fontFamily:'Poppins',fontSize:'24px'}}>
                <a href="/post" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Post a Job
                </a>
                <a href="/sectors" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Sectors
                </a>
                <a href="/disciplines" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Disciplines and Expertise
                </a>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="/"
                className="nav-link dropdown-toggle text-white "
                data-bs-toggle="dropdown" 
              >
                Partners
              </a>
              <div className="dropdown-menu rounded-0 rounded-bottom m-0" style={{background:'#111727',fontFamily:'Poppins',fontSize:'24px'}}>
                <a href="/tutors" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Tutors
                </a>
                <a href="/offshire-it-partners" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Offshore IT Partners
                </a>
                <a href="consultants" className="dropdown-item text-white " style={{background:'#111727'}}>
                  Consultants
                </a>
              </div>
            </div>
            <a href="/about" className="nav-item text-white nav-link">
              About Us
            </a>
            <a href="/contact" className="nav-item nav-link text-white ">
              Contact Us
            </a>
          </div>
          <div className="ms-auto d-none d-lg-block">
            <a href="/post" className="rounded-pill py-2 px-3 text-white" style={{background:'#111727', border: '2px solid white'}}>
              Post a Job
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</>

  );
}

export default Header;