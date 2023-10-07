import React from 'react';
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import Service from '../../Components/Service'
import Testimonial from '../../Components/Testimonial'
import Banner from '../../Components/Banner'
import Search from '../../Components/Search'
import Jobpost from '../../Components/Jobpost'
import HomeAbout from '../../Components/HomeAbout'

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <Jobpost />
      <HomeAbout />
      <Service/>
      <Testimonial/>
      <Footer />
    </>
  );
}

export default Home;
