import { React } from 'react';
import {
  Carousel,
  Categories,
  Recommended,
} from '../components';

export function Home() {
  return (
    <div>
      <Carousel />
      <Recommended />
      <Categories />
    </div>
  );
}

export default Home;
