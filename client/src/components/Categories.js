import { React, useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { QUERY_TUTORIALS_BY_CATEGORY } from '../utils/queries/tutorialQueries';


export function SubCategory({ subCategory }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
  const theme = useTheme();

  console.log('sub', subCategory);

  const { loading, error, data } = useQuery(QUERY_TUTORIALS_BY_CATEGORY, {
    variables: { categoryId: selectedSubCategory._id },
  });

  const tutorials = data?.tutorialsByCategory || [];
  console.log('data', data);

  //side effect to re-render
  useEffect(() => {
    setSelectedSubCategory(subCategory);
  }, [subCategory]);

  const imgStyle = {
    width: '90%',
    height: 'auto',
    overflow: 'hidden',
    objectFit: 'cover',
  }
  

  if (loading) { 
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error: {error.message}</p>;
  } else {    
    return (
      <>
        <Grid item xs={12}>
              <Card
                border={3}
                borderRadius={8}
                borderColor= 'black'
                backgroundColor= 'gray'
                p={2}
              >
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {selectedSubCategory.category}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
          <br></br>
          <Grid item xs={12}>
          <Grid container spacing={2}>
            {tutorials.map((option) => (
              <Grid item xs={12} sm={6} md={3} key={option._id}>
                <Card
                  border={3}
                  borderRadius={8}
                  borderColor= 'black'
                  backgroundColor= 'white'
                  p={2}
                >
                  <CardContent>
                    <Typography variant='subtitle1'>
                      {option.title}
                    </Typography>
                    <img src={option.thumbnail} alt={option.title} style={imgStyle} />
                    <Typography variant='body2'>
                      {option.overview}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    );
  }
}



export function Categories({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  const theme = useTheme();


  console.log('cat', categories);

  const setCategory = (category) => {
    if (category !== selectedCategory) {
    setSelectedCategory(category);
    setCategorySelected(true);
    }
  };

  return (
    <Box
      border={3}
      borderRadius={8}
      borderColor={theme.palette.mode === 'dark' ? 'black' : 'white'}
      backgroundColor={theme.palette.mode === 'dark' ? 'gray' : 'white'}
      p={2}
    >
      <Typography variant='h5' gutterBottom>
        Find Tutorials Based on Category!
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className='category-buttons'>
            {categories.map((category) => (
              <Button
                key={category.category}
                variant='outlined'
                size='small'
                className={`category-button ${categorySelected ? 'active' : ''}`}
                onClick={() => setCategory(category)}
              >
                {category.category}
              </Button>
              
            ))}
          </div>
          { categorySelected && (<SubCategory subCategory={selectedCategory}/>)} 
        </Grid>
      </Grid>
    </Box>
  );
}

export default Categories;
