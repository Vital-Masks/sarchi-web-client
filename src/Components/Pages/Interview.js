import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import URL from '../../Components/utils.json';

function Interview() {
  const [interviewData, setInterviewData] = useState([]);
  const [filteredInterviewData, setFilteredInterviewData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    practice: '',
    industry: '',
  });
  const [showFilteredData, setShowFilteredData] = useState(false);

  useEffect(() => {
    // Fetch data from the Strapi API when the component mounts
    axios
      .get(URL.BASE_URL + '/api/news-and-interview-techniques?populate=*')
      .then((response) => {
        setInterviewData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterResults = () => {
    const filteredData = interviewData.filter((item) => {
      return (
        (searchCriteria.type === '' ||
          item.attributes.Types === searchCriteria.type) &&
        item.attributes.Practice.includes(searchCriteria.practice) &&
        item.attributes.Industry.includes(searchCriteria.industry)
      );
    });

    setFilteredInterviewData(filteredData);
    setShowFilteredData(true);
  };

  useEffect(() => {
    filterResults();
  }, [searchCriteria, interviewData]);

  const handleTypeChange = (event) => {
    setSearchCriteria({ ...searchCriteria, type: event.target.value });
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
            className="display-2 py-5 text-white"
            style={{ fontFamily: 'Alatsi' }}
          >
            NEWS AND INTERVIEW TECHNIQUES
          </h1>
        </div>
      </div>

      <div style={{ padding: '0 30px' }}>
        <div
          className="container search-container-interview py-3 mb-5"
          style={{ borderRadius: '25px' }}
        >
          <form>
            <div className="wrapper">
              <div className="search-container-2">
                <select
                  name="type"
                  className="search"
                  value={searchCriteria.type}
                  onChange={handleTypeChange}
                >
                  <option value="">Select Type</option>
                  <option value="Article">Article</option>
                  <option value="Video">Video</option>
                </select>
                <input
                  type="text"
                  className="search"
                  placeholder="Practice"
                  value={searchCriteria.practice}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      practice: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="search"
                  placeholder="Industry"
                  value={searchCriteria.industry}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      industry: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className=" mb-5" style={{ padding: '0 30px' }}>
        <ul className="cards">
          {showFilteredData ? (
            filteredInterviewData.length > 0 ? (
              filteredInterviewData.map((item, index) => (
                <li className="cards_item" key={index}>
                  <div className="card">
                    <div className="card_image">
                      <img
                        src={
                          URL.BASE_URL +
                          item.attributes.Ref_Media.data.attributes.url
                        }
                        style={{ height: '325px', width: '500px' }}
                        alt={item.attributes.Title}
                      />
                    </div>
                    <div className="card_content">
                      <h2
                        className="card_title"
                        style={{
                          fontFamily: 'Alatsi',
                          fontSize: '18px',
                          float: 'left',
                        }}
                      >
                        {item.attributes.Date}
                      </h2>
                      <br></br>
                      <h2
                        className="card_title"
                        style={{
                          fontFamily: 'Alatsi',
                          fontSize: '30px',
                          float: 'left',
                        }}
                      >
                        {item.attributes.Title.toUpperCase()}
                      </h2>
                      <br></br>
                      <br />
                      <a
                        href={`/blog/${item.id}`}
                        className="btn py-2 rounded-pill text-white"
                        type="submit"
                        style={{ background: '#111727' }}
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No Results Found</p>
            )
          ) : interviewData.length > 0 ? (
            interviewData.map((item, index) => (
              <li className="cards_item" key={index}>
                <div className="card">
                  <div className="card_image">
                    <img
                      src={
                        URL.BASE_URL +
                        item.attributes.RefMedia.data.attributes.url
                      }
                      style={{ height: '325px', width: '500px' }}
                      alt={item.attributes.Title}
                    />
                  </div>
                  <div className="card_content">
                    <h2 className="card_title">{item.attributes.Date}</h2>
                    <h2 className="card_title">{item.attributes.Title}</h2>
                    <br />

                    <a
                      href={`/blog/${item.id}`}
                      className="btn py-2 rounded-pill text-white"
                      type="submit"
                      style={{ background: '#111727' }}
                    >
                      View More
                    </a>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No Results Found</p>
          )}
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default Interview;
