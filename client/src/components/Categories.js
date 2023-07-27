import { React, useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_TUTORIALS_BY_CATEGORY } from '../utils/queries/tutorialQueries';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import { HalfRating } from '../components';

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
      margin: theme.spacing(1),
      background: '#92b4d4',
      fontWeight: 'bold',
    },
  },

  card: {
    backgroundColor: 'var(--main-bg-color) !important',
    textAlign: 'left',
    height: '100%',
  },
  cardTitle: {
    fontSize: 'calc(16px + (2 * ((100vw - 600px) / (1200 - 600))))',
    // backgroundColor: 'var(--main-bg-color)',
    fontWeight: 'bold',
    padding: 0,
  },
  // Add the new class definition for the link
  link: {
    color: 'black', // Set the link color to black by default
    textDecoration: 'none', // Remove the default underline

    // Define styles for hover state
    '&:hover': {
      color: 'blue', // Set the link color to blue on hover
      textDecoration: 'underline', // Add underline on hover
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

  if (loading || loadingTutorials) {
    return <p>Loading...</p>;
  } else if (error || errorTutorials) {
    return <p>Error: {error?.message || errorTutorials?.message}</p>;
  } else {
    return (
      <>
        <Grid
          item
          xs={12}
        >
          <Card style={{ backgroundColor: '#c5dafa' }}>
            <CardContent>
              <Typography
                variant='h6'
                gutterBottom
              >
                {selectedSubCategory.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <br />
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            spacing={2}
          >
            {tutorials.map((option) => (
              <Grid
                item
                xs={10}
                md={3}
                key={option._id}
              >
                <Card className={classes.card}>
                  <CardMedia
                    component='img'
                    alt={option.title}
                    image={option.thumbnail}
                    className={`${classes.img}`}
                  ></CardMedia>
                  <CardContent style={{ padding: 0 }}>
                    <Link
                      to={`/tutorial/${option._id}`}
                      key={option._id}
                      className={classes.link} // Add the new class here for the link
                    >
                      <Typography className={classes.cardTitle}>
                        {option.title}
                      </Typography>
                    </Link>
                    <Typography className={classes.cardDescription}>
                      {option.overview}
                    </Typography>
                  </CardContent>
                  <HalfRating rating={option.averageRating} />
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
        style={{ marginTop: 16 }}
      >
        <Typography
          variant='h5'
          gutterBottom
        >
          Browse Tutorials By Category
        </Typography>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
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
