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
    axios
      .get(
        URL.BASE_URL + `/api/news-and-interview-techniques/${blogId}?populate=*`
      )
      .then((response) => {
        setBlogData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, [blogId]);
  console.log(blogData);

  const replaceNewlinesWithBreaks= (text) =>{
    return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
  }

  return (
    <>
      <Header />
      {blogData && (
        <div
          className="container-fluid page-header py-5 mb-3 wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container text-center py-5">
            <h1
              className="display-2 py-5 text-white"
              style={{ fontFamily: 'Alatsi' }}
            >
              {blogData.attributes.Title}
            </h1>
          </div>
        </div>
      )}
      {blogData && (
        <div className="custom-container py-5">
          
              <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                <p
                  style={{
                    color: '#1e1e1e',
                    fontFamily: '"Alatsi-Regular", Helvetica',
                    fontSize: '40px',
                    fontWeight: 700,
                  }}
                >
                  {blogData.attributes.Title}
                </p>
                <p className="no-galle-road">Posted Date : {blogData.attributes.Date} <br/>
                
                  Industry : {blogData.attributes.Industry} | Practice :{' '}
                  {blogData.attributes.Practice}
                </p>

                {/* <img src={URL.BASE_URL+blogData.attributes.Ref_Media.data.attributes.url} style={{height:'325px',width:'500px'}} alt={blogData.attributes.Title}/> */}

                {/* <div className="py-2">
                  <img
                    src={
                      URL.BASE_URL +
                      blogData.attributes.Ref_Media.data.attributes.url
                    }
                    style={{
                      height: '400px',
                      maxHeight: '100%',
                      maxWidth: 'auto',
                      marginBottom: '5px',
                    }}
                    alt={blogData.attributes.Title}
                  />
                </div> */}
                
  <div className="no-galle-road" dangerouslySetInnerHTML={replaceNewlinesWithBreaks(blogData.attributes.Body)}></div>
 
             
                <br></br>
              </div>
            
        </div>
      )}
      <Footer />
    </>
  );
}

export default Blog;
