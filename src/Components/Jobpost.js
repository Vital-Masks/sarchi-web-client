import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from './utils.json';

function Jobpost() {
  const [vacancyData, setVacancyData] = useState([]);
  const [filteredVacancyData, setFilteredVacancyData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    jobType: '',
    experienceLevel: '',
    minSalary: '',
    location: '',
    timing: '',
    searchQuery: '',
  });
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  

  useEffect(() => {
    axios
      .get(URL.BASE_URL + '/api/post-job-vaccancies')
      .then((response) => {
        setVacancyData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const limitWords = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }

  const filterResults = () => {
    const minSalary = parseInt(searchCriteria.minSalary, 10); // Convert minSalary to an integer
  
    const filteredData = vacancyData.filter((item) => {
      const searchQuery = searchCriteria.searchQuery.toLowerCase();
      const jobType = searchCriteria.jobType.toLowerCase();
      const experienceLevel = searchCriteria.experienceLevel.toLowerCase();
      const location = searchCriteria.location.toLowerCase();
      const timing = searchCriteria.timing.toLowerCase();
  
      const jobRoleMatch = item.attributes.Job_Role.toLowerCase().includes(searchQuery);
      const typeOfJobsMatch = item.attributes.Type_Of_Jobs.toLowerCase().includes(jobType);
      const experienceLevelsMatch = item.attributes.Experience_Levels.toLowerCase().includes(experienceLevel);
      const locationMatch = item.attributes.Location.toLowerCase().includes(location);
      const timingsMatch = item.attributes.Timings.toLowerCase().includes(timing);
  
      // Check if minSalary is a valid number and if it's higher than or equal to item's Min_Salary
      const minSalaryMatch = !isNaN(minSalary) && item.attributes.Min_Salary >= minSalary;
  
      return jobRoleMatch && typeOfJobsMatch && experienceLevelsMatch && locationMatch && timingsMatch && (isNaN(minSalary) || minSalaryMatch);
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
    setSearchCriteria({
      ...searchCriteria,
      experienceLevel: event.target.value,
    });
  };
  const handleTimingChange = (event) => {
    setSearchCriteria({ ...searchCriteria, timing: event.target.value });
  };
  return (
    <div>
      
      <div style={{ padding: '0 30px' }}>
        <div
          className="custom-container search-container-header py-3 mb-3"
          style={{ borderRadius: '25px' }}
        >
          <form>
            <div className="wrapper">
              <div className="search-container ">
                <select
                  name="jobType"
                  className="search"
                  value={searchCriteria.type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Type</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                </select>
                <select
                  name="experienceLevel"
                  className="search"
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
                  className="search"
                  placeholder="SalaryRange"
                  value={searchCriteria.minSalary}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      minSalary: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  name="location"
                  className="search"
                  placeholder="Location"
                  value={searchCriteria.location}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      location: e.target.value,
                    })
                  }
                />
                <select
                  name="timing"
                  className="search"
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
                  className="search"
                  placeholder="Job Role"
                  value={searchCriteria.searchQuery}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      searchQuery: e.target.value,
                    })
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
      </div>
      <div className="container-fluid text-black mb-5 wow fadeIn">
        <div className="custom-container">
          
          <div className="row">
            {searchResultsVisible
              ? filteredVacancyData.slice(0, 6).map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="box mt-4">
                      <div className="rectangle">
                        <div className="container py-3">
                          <div className="row">
                            <div className="col-lg-12">
                              <h1
                                className="display-4 text-black"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '25px',
                                  marginTop: '30px',
                                  textAlign: 'left',
                                  fontFamily: 'Alatsi',
                                }}
                              >
                                {item.attributes.Job_Role.toUpperCase()}
                              </h1>
                              <div className="d-flex flex-wrap mb-2">
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
                                  {item.attributes.Location}
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
                                  name="salaryRange"
                                >
                                  {(item.attributes.Min_Salary)/1000}K{currencySymbols[item.attributes.Currency]}-
                                  {(item.attributes.Max_Salary)/1000}K{currencySymbols[item.attributes.Currency]}
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
                                  {item.attributes.Timings}
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
                                  {item.attributes.Experience_Levels}
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
                                  {item.attributes.Type_Of_Jobs}
                                </p>
                              </div>
                              <p
      className="text-black"
      style={{
        marginLeft: '10px',
        fontSize: '18px',
        textAlign: 'left',
        fontWeight: '400',
        lineHeight: '30px',
      }}
    >
      {limitWords(item.attributes.Job_Description, 50)}
    </p>
                              <div
                                className="col-12 mb-5 text-left"
                                style={{ marginLeft: '10px' }}
                              >
                                <a
                                  href={`/job/${item.id}`}
                                  className="btn py-2 rounded-pill text-white"
                                  type="submit"
                                  style={{ background: '#111727' }}
                                >
                                  Apply for Job
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : vacancyData.slice(0, 6).map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="box mt-4">
                      <div className="rectangle">
                        <div className="container py-3">
                          <div className="row">
                            <div className="col-lg-12">
                              <h1
                                className="display-4 text-black"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '25px',
                                  marginTop: '30px',
                                  textAlign: 'left',
                                  fontFamily: 'Alatsi',
                                }}
                              >
                                {item.attributes.Job_Role}
                              </h1>
                              <div className="d-flex flex-wrap mb-2">
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
                                  {item.attributes.Location}
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
                                  name="salaryRange"
                                >
                                  {(item.attributes.Min_Salary)/1000}K{currencySymbols[item.attributes.Currency]}-
                                  {(item.attributes.Max_Salary)/1000}K{currencySymbols[item.attributes.Currency]}
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
                                  {item.attributes.Timings}
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
                                  {item.attributes.Experience_Levels}
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
                                  {item.attributes.Type_Of_Jobs}
                                </p>
                              </div>
                              <p
      className="text-black"
      style={{
        marginLeft: '10px',
        fontSize: '18px',
        textAlign: 'left',
        fontWeight: '400',
        lineHeight: '30px',
      }}
    >
      {limitWords(item.attributes.Job_Description, 50)}
    </p>
                              <div
                                className="col-12 mb-5 text-left"
                                style={{ marginLeft: '10px' }}
                              >
                                <a
                                  href={`/job/${item.id}`}
                                  className="btn py-2 rounded-pill text-white"
                                  type="submit"
                                  style={{ background: '#111727' }}
                                >
                                  Apply for Job
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="col-12 text-center mt-4 mb-5">
        <a
          href="/vacancies"
          className="btn btn-dark btn-lg rounded-pill"
          style={{ background: '#111727' }}
        >
          View More
        </a>
      </div>
    </div>
  );
}

export default Jobpost;
