import React, { useState, useEffect } from 'react';
import axios from 'axios';
import URL from './utils.json';

function Jobpost() {
  const [vacancyData, setVacancyData] = useState([]);
  const [filteredVacancyData, setFilteredVacancyData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    jobType: '',
    experienceLevel: '',
    salaryEstimate: '',
    location: '',
    permanent: '',
    searchQuery: '',
  });
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

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

  const filterResults = () => {
    const filteredData = vacancyData.filter((item) => {
      return (
        item.attributes.Job_Role.includes(searchCriteria.searchQuery) &&
        item.attributes.Type_Of_Jobs.includes(searchCriteria.jobType) &&
        item.attributes.Experience_Levels.includes(
          searchCriteria.experienceLevel
        ) &&
        (searchCriteria.salaryEstimate === '' ||
          (item.attributes.Min_Salary >=
            parseInt(searchCriteria.salaryEstimate, 10) &&
            item.attributes.Max_Salary <=
              parseInt(searchCriteria.salaryEstimate, 10))) &&
        item.attributes.Location.includes(searchCriteria.location) &&
        item.attributes.Timings.includes(searchCriteria.permanent)
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
    setSearchCriteria({
      ...searchCriteria,
      experienceLevel: event.target.value,
    });
  };
  const handleTimingChange = (event) => {
    setSearchCriteria({ ...searchCriteria, timing: event.target.value });
  };
  return (
    <>
      <div
        className="search-container-header py-3 mb-3"
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
                // style={{textAlign:'center'}}
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
                value={searchCriteria.salaryEstimate}
                onChange={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    salaryEstimate: e.target.value,
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

      <div className="job-post text-black wow fadeIn">
        <div className="container">
          <div className="row">
            {searchResultsVisible
              ? filteredVacancyData.map((item, index) => (
                  <div className="box mt-4" key={index}>
                    <div className="rectangle">
                      <div className="container py-2">
                        <div className="row">
                          <div className="col-md-10">
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
                            <div className="d-flex flex-wrap mb-3">
                              <p
                                className="search rounded-pill text-black py-2 mr-2 mb-2 text-center"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '17px',
                                  marginTop: '05px',
                                  background: '#ebff9d',
                                  width: '100px',
                                  textAlign: 'center',
                                  height: '40px',
                                }}
                              >
                                {item.attributes.Location}
                              </p>
                              <p
                                className="search rounded-pill text-black py-2 mr-2 mb-2"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '17px',
                                  marginTop: '05px',
                                  background: '#9effe2',
                                  width: '100px',
                                  textAlign: 'center',
                                  height: '40px',
                                }}
                              >
                                {item.attributes.Min_Salary}K$-
                                {item.attributes.Max_Salary}K$
                              </p>
                              <p
                                className="search rounded-pill py-2 text-black mr-2 mb-2"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '17px',
                                  marginTop: '05px',
                                  background: '#ffb0b0',
                                  width: '100px',
                                  textAlign: 'center',
                                  height: '40px',
                                }}
                              >
                                {item.attributes.Timings}
                              </p>
                              <p
                                className="search rounded-pill text-black py-2 mr-2 mb-2"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '17px',
                                  marginTop: '05px',
                                  background: '#f098ff',
                                  width: '100px',
                                  textAlign: 'center',
                                  height: '40px',
                                }}
                              >
                                {item.attributes.Experience_Levels}
                              </p>
                              <p
                                className="search rounded-pill py-2 text-black mb-2"
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '17px',
                                  marginTop: '05px',
                                  background: '#67b6ff',
                                  width: '100px',
                                  textAlign: 'center',
                                  height: '40px',
                                }}
                              >
                                {item.attributes.Type_Of_Jobs}
                              </p>
                            </div>
                            <p
                              className="text-black"
                              style={{
                                fontSize: 20,
                                fontWeight: 400,
                                lineHeight: '1.5',
                                fontFamily: 'Poppins',
                                marginLeft: '10px',
                              }}
                            >
                              {item.attributes.Job_Description}
                            </p>
                          </div>
                          <div className="col-md-2 mb-3 text-center">
                            <a
                              href={`/job/${item.id}`} // Fixed the link to use `item.id`
                              className="btn btn-dark btn-lg rounded-pill mt-4"
                              style={{ float: 'right' }}
                            >
                              Apply for Job
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : vacancyData.map((item, index) => (
                  <div className="box mt-4" key={index}>
                    <div className="rectangle">
                      <div className="container py-2">
                        <div className="row">
                          <div className="col-lg-8">
                            <h1
                              className="display-4 text-black"
                              style={{
                                textAlign: 'left',
                                fontFamily: 'Alatsi',
                                fontSize: '30px',
                              }}
                            >
                              {item.attributes.Job_Role}
                            </h1>
                            <div className="d-flex flex-wrap mb-3">
                              <p
                                className="search rounded-pill text-black py-1 mr-2 mb-2 text-center"
                                style={{
                                  background: '#ebff9d',
                                  width: 100,
                                  textAlign: 'center',
                                }}
                              >
                                {item.attributes.Location}
                              </p>
                              <p
                                className="search rounded-pill text-black py-1 mr-2 mb-2"
                                style={{
                                  background: '#9effe2',
                                  width: 100,
                                  textAlign: 'center',
                                  marginLeft: '5px',
                                }}
                              >
                                {item.attributes.MinSalary}K$-
                                {item.attributes.MaxSalary}K$
                              </p>
                              <p
                                className="search rounded-pill py-1 text-black mr-2 mb-2"
                                style={{
                                  background: '#ffb0b0',
                                  width: 100,
                                  textAlign: 'center',
                                  marginLeft: '5px',
                                }}
                              >
                                {item.attributes.Timings}
                              </p>
                              <p
                                className="search rounded-pill text-black py-1 mr-2 mb-2"
                                style={{
                                  background: '#f098ff',
                                  width: 100,
                                  textAlign: 'center',
                                  marginLeft: '5px',
                                }}
                              >
                                {item.attributes.Experience_Levels}
                              </p>
                              <p
                                className="search rounded-pill py-1 text-black mb-2"
                                style={{
                                  background: '#67b6ff',
                                  width: 100,
                                  textAlign: 'center',
                                  marginLeft: '5px',
                                }}
                              >
                                {item.attributes.Type_Of_Jobs}
                              </p>
                            </div>
                            <p
                              className="text-black"
                              style={{
                                fontSize: 18,
                                fontWeight: 400,
                                lineHeight: '1.5',
                                fontFamily: 'Poppins',
                              }}
                            >
                              {item.attributes.JobDescription}
                            </p>
                          </div>
                          <div className="col-lg-4 text-center">
                            <a
                              href={`/job/${item.id}`} // Fixed the link to use `item.id`
                              className="btn btn-dark btn-lg rounded-pill mt-4"
                              style={{ float: 'right' }}
                            >
                              Apply for Job
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            {/* End */}
          </div>
        </div>
      </div>
      <div className="col-12 text-center mt-4 mb-4">
        <a
          href="/vacancies"
          className="btn btn-dark btn-lg rounded-pill"
          style={{ background: '#111727' }}
        >
          View More
        </a>
      </div>
    </>
  );
}

export default Jobpost;
