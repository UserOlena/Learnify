import { React, useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TUTORIALS_BY_CATEGORY } from '../utils/queries/tutorialQueries';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';

const useStyles = makeStyles((theme) => ({
  customLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
    },
  },
  categoryButtons: {
    '& .category-button': {
      marginRight: theme.spacing(2),
    },
  },
}));

export function SubCategory({ subCategory }) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
  const theme = useTheme();
  const classes = useStyles();

  console.log('sub', subCategory);

  const { loading, error, data } = useQuery(QUERY_TUTORIALS_BY_CATEGORY, {
    variables: { categoryId: selectedSubCategory._id },
  });

  const {
    loading: loadingTutorials,
    error: errorTutorials,
    data: dataTutorials,
  } = useQuery(GET_TUTORIALS);

  const tutorials = data?.tutorialsByCategory || [];
  console.log('data', data);

  useEffect(() => {
    setSelectedSubCategory(subCategory);
  }, [subCategory]);

  const imgStyle = {
    width: '90%',
    height: 'auto',
    overflow: 'hidden',
    objectFit: 'cover',
  };

  if (loading || loadingTutorials) {
    return <p>Loading...</p>;
  } else if (error || errorTutorials) {
    return <p>Error: {error?.message || errorTutorials?.message}</p>;
  } else {
    return (
      <>
        <Grid item xs={12}>
          <Card
            border={3}
            borderRadius={8}
            borderColor='black'
            backgroundColor='gray'
            p={2}
          >
            <CardContent>
              <Typography variant='h6' gutterBottom>
                {selectedSubCategory.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {tutorials.map((option) => (
              <Grid item xs={12} sm={6} md={3} key={option._id}>
                <Card
                  border={3}
                  borderRadius={8}
                  borderColor='black'
                  backgroundColor='white'
                  p={2}
                >
                  <CardContent>
                    <Link
                      to={`/tutorial/${option._id}`}
                      key={option._id}
                      className={classes.customLink}
                    >
                      <Typography variant='subtitle1'>
                        {option.title}
                      </Typography>
                    </Link>
                    <img
                      src={option.thumbnail}
                      alt={option.title}
                      style={imgStyle}
                    />
                    <Typography variant='body2'>{option.overview}</Typography>
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
  const classes = useStyles();

  const setCategory = (category) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setCategorySelected(true);
    }
  };

  return (
    <>
      <Box
        border={3}
        borderRadius={8}
        borderColor='black'
        backgroundColor='white'
        p={2}
      >
        <Typography variant='h5' gutterBottom>
          Find Tutorials Based on Category!
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.categoryButtons}>
              {categories.map((category) => (
                <Button
                  key={category.category}
                  variant='outlined'
                  size='small'
                  className={`category-button ${
                    categorySelected ? 'active' : ''
                  }`}
                  onClick={() => setCategory(category)}
                >
                  {category.category}
                </Button>
              ))}
            </div>
            {categorySelected && <SubCategory subCategory={selectedCategory} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Categories;
