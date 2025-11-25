import React from 'react';
import Banner from './Banner.jsx';
import Category from './Category.jsx';
import Footer from '../../layout/Footer/Footer.jsx';
import Navbar from '../../layout/Header/Navbar.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Category />
      <Footer />
    </>
  );
}

export default Home;
