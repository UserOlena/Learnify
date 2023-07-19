import { React } from 'react';
import {
  Carousel,
  Categories,
  Footer,
  Navbar,
  Recommended,
} from '../components';

export function Home() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Recommended />
      <Categories />
      <Footer />
    </div>
  );
}

export default Home;
