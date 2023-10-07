import React, { useState, useEffect } from 'react';

function Search() {
  return (
    <div className="container search-container-header py-3 mb-3 rounded-pill">
       <form>
        <div className="wrapper">
          <div className="search-container rounded-pill">
            {/* Input fields for search criteria */}
            <input
              type="text"
              name="jobType"
              className="search rounded-pill"
              placeholder="TypeofJobs"
              
            />
            <input
              type="text"
              name="experienceLevel"
              className="search rounded-pill"
              placeholder="ExperienceLevels"
              
            />
            <input
              type="text"
              name="salaryEstimate"
              className="search rounded-pill"
              placeholder="SalaryRange"
              
            />
            <input
              type="text"
              name="location"
              className="search rounded-pill"
              placeholder="Location"
              
            />
            <input
              type="text"
              name="permanent"
              className="search rounded-pill"
              placeholder="Timings"
              
            />
            <input
              type="text"
              name="searchQuery"
              className="search rounded-pill"
              placeholder="Job Role"
              
            />
            <div className="search-container rounded-pill">
              <button
                type="button"
                className="rounded-pill py-2 px-3 text-white text-center"
                style={{ background: '#111727', marginRight: '5px', height: '40px', fontWeight: 'bold' }}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </form>


    </div>
  );
}

export default Search;
