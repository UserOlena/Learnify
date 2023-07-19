import { React, useState } from 'react';
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
import { QUERY_CATEGORIES } from '../utils/categoryQuery';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('Category 1');
  const theme = useTheme();

  const { loading, error, data } = useQuery(QUERY_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data.categories.map((category) => category.category);

  const filteredOptions = selectedCategory
    ? data.categories.filter(
        (category) => category.category === selectedCategory
      )
    : data.categories;

  function selectCategory(category) {
    setSelectedCategory(category);
  }

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
                key={category}
                variant='outlined'
                size='small'
                className={`category-button ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => selectCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          {selectedCategory && (
            <Card
              border={3}
              borderRadius={8}
              borderColor={theme.palette.mode === 'dark' ? 'white' : 'black'}
              backgroundColor={theme.palette.mode === 'dark' ? 'gray' : 'gray'}
              p={2}
            >
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {selectedCategory}
                </Typography>
                <Typography variant='body1'>
                  Description for {selectedCategory} category goes here...
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
        {selectedCategory && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {filteredOptions.map((option) => (
                <Grid item xs={12} sm={6} md={3} key={option._id}>
                  <Card
                    border={3}
                    borderRadius={8}
                    borderColor={
                      theme.palette.mode === 'dark' ? 'white' : 'black'
                    }
                    backgroundColor={
                      theme.palette.mode === 'dark' ? 'gray' : 'white'
                    }
                    p={2}
                  >
                    <CardContent>
                      <Typography variant='subtitle1'>
                        {option.category}
                      </Typography>
                      <Typography variant='body2'>
                        Additional information about {option.category} goes
                        here...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Categories;
