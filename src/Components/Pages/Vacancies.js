import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Vacancies() {
  const [vacancyData, setVacancyData] = useState([]);
  const [filteredVacancyData, setFilteredVacancyData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    jobType: '',
    experienceLevel: '',
    salaryEstimate: '',
    location: '',
    timing: '',
    searchQuery: '',
  });
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  useEffect(() => {
    axios
      .get('http://157.230.236.88:1337/api/post-job-vaccancies')
      .then((response) => {
        setVacancyData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterResults = () => {
    const filteredData = vacancyData.filter((item) => {
      return (
        item.attributes.JobRole.includes(searchCriteria.searchQuery) &&
        item.attributes.TypeOfJobs.includes(searchCriteria.jobType) &&
        item.attributes.ExperienceLevels.includes(searchCriteria.experienceLevel) &&
        (searchCriteria.salaryEstimate === '' ||
          (item.attributes.MinSalary >= parseInt(searchCriteria.salaryEstimate, 10) &&
            item.attributes.MaxSalary <= parseInt(searchCriteria.salaryEstimate, 10))) &&
        item.attributes.Location.includes(searchCriteria.location) &&
        item.attributes.Timings.includes(searchCriteria.timing)
      );
    });

    setFilteredVacancyData(filteredData);
    setSearchResultsVisible(true);
  };

  useEffect(() => {
    filterResults();
  }, [searchCriteria, vacancyData]);

  const handleSearchClick = () => {
    filterResults();
  };

  const handleTypeChange = (event) => {
    setSearchCriteria({ ...searchCriteria, jobType: event.target.value });
  };
  const handleExperienceChange = (event) => {
    setSearchCriteria({ ...searchCriteria, experienceLevel: event.target.value });
  };
  const handleTimingChange = (event) => {
    setSearchCriteria({ ...searchCriteria, timing: event.target.value });
  };

  return (
    <>
      <Header />
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-2 py-5 text-white" style={{fontFamily: 'Alatsi' }}>
            RECENT JOBS
          </h1>
        </div>
      </div>

      <div className="container search-container-header py-3 mb-3 rounded-pill">
        <form>
          <div className="wrapper">
            <div className="search-container rounded-pill">
            <select
                name="jobType"
                className="search rounded-pill"
                value={searchCriteria.type}
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
              <select
                name="experienceLevel"
                className="search rounded-pill"
                value={searchCriteria.type}
                onChange={handleExperienceChange}
              >
                <option value="">Experience Level</option>
                <option value="Senior">Senior</option>
                <option value="Associate">Associate</option>
                <option value="Intern">Intern</option>
              </select>
              <input
                type="text"
                name="salaryEstimate"
                className="search rounded-pill"
                placeholder="SalaryRange"
                value={searchCriteria.salaryEstimate}
                onChange={(e) =>
                  setSearchCriteria({ ...searchCriteria, salaryEstimate: e.target.value })
                }
              />
              <input
                type="text"
                name="location"
                className="search rounded-pill"
                placeholder="Location"
                value={searchCriteria.location}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, location: e.target.value })}
              />
              <select
                name="timing"
                className="search rounded-pill"
                value={searchCriteria.timing}
                onChange={handleTimingChange}
              >
                <option value="">Select Timing</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
              <input
                type="text"
                name="searchQuery"
                className="search rounded-pill"
                placeholder="Job Role"
                value={searchCriteria.searchQuery}
                onChange={(e) =>
                  setSearchCriteria({ ...searchCriteria, searchQuery: e.target.value })
                }
              />
              {/* <div className="search-container rounded-pill">
                <button
                  type="button"
                  className="rounded-pill py-2 px-3 text-white text-center"
                  style={{ background: '#111727', marginRight: '5px', height: '40px', fontWeight: 'bold' }}
                  onClick={handleSearchClick}
                >
                  SEARCH
                </button>
              </div> */}
            </div>
          </div>
        </form>
      </div>

      <div className="container-fluid text-black mb-5 wow fadeIn">
        <div className="container">
          <h1 className="display-6 mb-4" style={{ fontFamily: 'Alatsi' }}>
            Results Found
          </h1>
          <div className="row">
            {searchResultsVisible ? (
              filteredVacancyData.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="box mt-4">
                     <div className="rectangle">
                     <div className="container py-3">
                     <div className="row">
                     <div className="col-lg-12">
                           <h1 className="display-4 text-black" style={{marginLeft:'10px',fontSize:'25px',marginTop:'30px',textAlign:'left',fontFamily:'Alatsi'}}>{item.attributes.JobRole}</h1>
                           <div className="d-flex flex-wrap mb-2">
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#ebff9d',width:'100px',textAlign:'center'}}>{item.attributes.Location}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#9effe2',width:'100px',textAlign:'center'}} name='salaryRange'>{item.attributes.MinSalary}K$-{item.attributes.MaxSalary}K$</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#ffb0b0',width:'100px',textAlign:'center'}}>{item.attributes.Timings}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#f098ff',width:'100px',textAlign:'center'}}>{item.attributes.ExperienceLevels}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#67b6ff',width:'100px',textAlign:'center'}}>{item.attributes.TypeOfJobs}</p>
                         </div>
                         <p className="text-black" style={{marginLeft:'10px',fontSize:'18px',textAlign:'left', fontWeight:'400',lineHeight:'30px'}}>
                         {item.attributes.JobDescription}
                         </p>
                         <div className="col-12 mb-5 text-left" style={{marginLeft:'10px'}}>
                             <a href={`/job/${item.id}`} className="btn py-2 rounded-pill text-white" type="submit" style={{background:'#111727'}}>Apply for Job</a>
                          </div>
                     </div>
                     </div>
                       </div>
                      </div>
                   </div>
                   </div>
              ))
            ) : (
              vacancyData.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="box mt-4">
                     <div className="rectangle">
                     <div className="container py-3">
                     <div className="row">
                     <div className="col-lg-12">
                           <h1 className="display-4 text-black" style={{marginLeft:'10px',fontSize:'25px',marginTop:'30px',textAlign:'left',fontFamily:'Alatsi'}}>{item.attributes.JobRole}</h1>
                           <div className="d-flex flex-wrap mb-2">
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#ebff9d',width:'100px',textAlign:'center'}}>{item.attributes.Location}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#9effe2',width:'100px',textAlign:'center'}} name='salaryRange'>{item.attributes.MinSalary}K$-{item.attributes.MaxSalary}K$</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#ffb0b0',width:'100px',textAlign:'center'}}>{item.attributes.Timings}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#f098ff',width:'100px',textAlign:'center'}}>{item.attributes.ExperienceLevels}</p>
                              <p className="search rounded-pill text-black mr-2 mb-2 py-1" style={{marginLeft:'10px',fontSize:'15px',marginTop:'05px',background:'#67b6ff',width:'100px',textAlign:'center'}}>{item.attributes.TypeOfJobs}</p>
                         </div>
                         <p className="text-black" style={{marginLeft:'10px',fontSize:'18px',textAlign:'left', fontWeight:'400',lineHeight:'30px'}}>
                         {item.attributes.JobDescription}
                         </p>
                         <div className="col-12 mb-5 text-left" style={{marginLeft:'10px'}}>
                             <a href={`/job/${item.id}`} className="btn py-2 rounded-pill text-white" type="submit" style={{background:'#111727'}}>Apply for Job</a>
                          </div>
                     </div>
                     </div>
                       </div>
                      </div>
                   </div>
                   </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vacancies;
