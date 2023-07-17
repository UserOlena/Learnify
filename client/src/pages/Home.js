import { React, useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Recommendations from "../components/Recommended";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

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
