import { React, useState } from 'react';
import { Carousel, Categories, Footer, Navbar, Recommended } from '../components'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Recommendations />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
