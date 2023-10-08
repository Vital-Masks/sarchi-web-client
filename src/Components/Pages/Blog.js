import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import axios from 'axios'; // Import Axios or your preferred HTTP library
import URL from '../../Components/utils.json';

function Blog() {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    // Fetch job data using blogId
    axios.get(URL.BASE_URL+`/api/news-and-interview-techniques/${blogId}`)
      .then((response) => {
        setBlogData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, [blogId]);

  return (
    <>
      <Header />
      {blogData && (
        <div className="container-fluid page-header py-5 mb-3 wow fadeIn" data-wow-delay="0.1s">
          <div className="container text-center py-5">
            <h1 className="display-2 py-5 text-white" style={{fontFamily:'Alatsi'}}>
            {blogData.attributes.Title}
            </h1>
          </div>
        </div>
    )}
      {blogData && (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
        <p style={{color: '#1e1e1e',fontFamily: '"Alatsi-Regular", Helvetica',fontSize: '30px',fontWeight: 400}}>{blogData.attributes.Title}</p>
          <p className="no-galle-road"> 
          {blogData.attributes.Body}
        </p><br></br>
        
        </div>
        
            </div>
        </div>
        </div> )}
      <Footer />
    </>
  );
}

export default Blog;
