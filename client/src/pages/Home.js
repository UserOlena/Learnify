import { React } from 'react';
import {
  Carousel,
  Categories,
  Recommended,
} from '../components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries/categoryQueries';

export function Home() {

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  return (
    <div>
      <Carousel />
      <Recommended />
      { loading 
        ? <p>Loading...</p> 
        : <Categories categories={data.categories} /> }
    </div>
  );
}

export default Home;
