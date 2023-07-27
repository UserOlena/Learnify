import { React } from 'react';
import {
  Carousel,
  Categories,
  Recommended,
} from '../components';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries/categoryQueries';

import { Container } from '@material-ui/core';

export function Home() {

  const { loading, error, data } = useQuery(GET_CATEGORIES);

  return (
    <Container>
      <Carousel />
      <Recommended />
      { loading 
        ? <p>Loading...</p> 
        : <Categories categories={data.categories} /> }
    </Container>
  );
}

export default Home;
