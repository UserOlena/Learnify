// React / router imports
import { React, useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
} from '@mui/material';
import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';

// Imports for interacting with the db
import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries/categoryQueries';
import { GET_USER } from '../utils/queries/userQueries';
import { ADD_TUTORIAL } from '../utils/mutations/tutorialMutations';

// Imports for other utilities
import { isEmptyInput } from '../utils/validation';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: `100%`,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginLeft: 8,
    marginRight: 8,
    ...theme.typography.button,
    backgroundColor: '#98b7f5',
    fontWeight: 'bold',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Bold the selected categories in the select list
function getStyles(category, selectedCategories, theme) {
  const selectedCategoryNames = selectedCategories.map((selectedCategory) => {
    return selectedCategory.category;
  });
  return {
    fontWeight:
      selectedCategoryNames.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

export function AddTutorial() {
  const classes = useStyles();
  const theme = useTheme();

  // Set default state values
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isValid: true,
  };

  const [title, setTitle] = useState(inputDefaultValues);
  const [overview, setOverview] = useState(inputDefaultValues);
  const [thumbnail, setThumbnail] = useState(inputDefaultValues);
  const [selectedCategories, setSelectedCategories] = useState({
    ...inputDefaultValues,
    value: [],
  });
  const [loggedOut, setLoggedOut] = useState(false);

  // Get category data to populate select list
  const { data: categoryData } = useQuery(GET_CATEGORIES);
  const categories = categoryData?.categories || [];

  // Set up mutation to add the tutorial to the db
  const [addTutorial, { error }] = useMutation(ADD_TUTORIAL);

  // Get the logged in user's information
  const { data: userData } = useQuery(GET_USER);

  let user;
  if (userData) {
    user = userData.me;
  }

  // When form is submitted, add the tutorial to the db
  async function handleSubmit(e) {
    e.preventDefault();

    // If user is not logged in, set state to show error and exit submit function
    if (!user) {
      setLoggedOut(true);
      return;
    }

    // Get only the IDs of the selected categories
    const categoryIds = selectedCategories.value.map((category) => {
      return category._id;
    });

    const variables = {
      title: title.value,
      overview: overview.value,
      thumbnail: thumbnail.value,
      categories: categoryIds,
      teacher: user._id,
    };

    try {
      await addTutorial({ variables });
    } catch (error) {
      console.log(error);
    }
  }

  // set a new value to the state.value associated to the field that invokes this function
  function handleOnChange(inputValue, setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: inputValue,
    }));
  }

  // verify that the input is non-blank
  // set the associated state to display the appropriate error message based on the validation result
  function handleOnBlur(inputValue, setState) {
    // ensure that the input is not empty
    if (isEmptyInput(inputValue)) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: true,
      }));
      return;
    }
  }

  // update the state to clear the error when the user focuses on that field
  function handleOnFocus(state, setState) {
    // change state to remove the error message on Focus if previously input was empty
    if (state.isEmpty) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: false,
      }));
      return;
    }
  }

  return (
    <div>
      <Typography 
        component='h1' 
        variant='h5' 
        gutterBottom
        sx={{ mt: 4 }}
      >
        Add a Tutorial
      </Typography>
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          ml: 'auto',
          mr: 'auto',
          width: '80%',
          maxWidth: '800px',
        }}
      >
        <Typography component='p'>
          Fill in the fields below to start creating your tutorial. Upon
          clicking the save button, you will be taken to a page where you can
          add your lessons to the tutorial.
        </Typography>
        <TextField
          required
          fullWidth
          id='title'
          name='title'
          label='Title'
          margin='normal'
          onChange={(e) => 
            handleOnChange(e.target.value.trim(), setTitle)
          }
          onBlur={(e) => 
            handleOnBlur(e.target.value, setTitle)
          }
          error={title.isEmpty}
          helperText={title.isEmpty && 'Please enter a title for your tutorial'}
          onFocus={() => 
            handleOnFocus(title, setTitle)
          }
        />
        <TextField
          required
          fullWidth
          id='overview'
          name='overview'
          label='Overview (1-2 sentences)'
          margin='normal'
          multiline
          minRows={2}
          onChange={(e) => 
            handleOnChange(e.target.value.trim(), setOverview)
          }
          onBlur={(e) => 
            handleOnBlur(e.target.value, setOverview)
          }
          error={overview.isEmpty}
          helperText={
            overview.isEmpty && 'Please enter an overview of your tutorial'
          }
          onFocus={() => handleOnFocus(overview, setOverview)}
        />
        <TextField
          required
          fullWidth
          id='thumbnail'
          name='thumbnail'
          label='Thumbnail Image URL'
          margin='normal'
          onChange={(e) => {
            handleOnChange(e.target.value.trim(), setThumbnail);
          }}
          onBlur={(e) => 
            handleOnBlur(e.target.value, setThumbnail)
          }
          error={thumbnail.isEmpty}
          helperText={
            thumbnail.isEmpty &&
            'Please enter the URL of a thumbnail for your tutorial'
          }
          onFocus={() => 
            handleOnFocus(thumbnail, setThumbnail)
          }
        />
        <FormControl
          required
          className={classes.formControl}
          error={selectedCategories.isEmpty}
        >
          <InputLabel id='categories-label'>
            Categories (choose all that apply)
          </InputLabel>
          <Select
            labelId='categories-label'
            id='categories'
            name='categories'
            multiple
            value={selectedCategories.value}
            onChange={(e) =>
              handleOnChange(e.target.value, setSelectedCategories)
            }
            onBlur={(e) => 
              handleOnBlur(e.target.value, setSelectedCategories)
            }
            onFocus={() =>
              handleOnFocus(selectedCategories, setSelectedCategories)
            }
            input={<Input id='categories-input' />}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value._id}
                    label={value.category}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.category}
                value={category}
                style={getStyles(
                  category.category,
                  selectedCategories.value,
                  theme
                )}
              >
                {category.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loggedOut && (
          <Typography color='error' component='p'>
            You must be signed in to submit a tutorial. 
            <Link to='/signin'>Sign In</Link>
          </Typography>
        )}
        <Button 
          type='submit' 
          variant='contained' 
          sx={{ mt: 3, mb: 5 }}
        >
          Save Your Tutorial
        </Button>
      </Box>
    </div>
  );
}

export default AddTutorial;
