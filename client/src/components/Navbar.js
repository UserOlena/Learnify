import  { React, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  InputBase,
  Button,
  IconButton,
  Hidden,
  makeStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries/categoryQueries';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      userSelect: 'none',
    },
    appBar: {
      backgroundColor: '#FAF0E6',
      color: 'black',
      opacity: '0.8',
      height: '60px',
    },
    logo: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: '50px',
      backgroundColor: '#fff',
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      width: '1300px',
      border: '2px solid black',
      [theme.breakpoints.down('sm')]: {
        width: '300px',
      },
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888888',
    },
    inputRoot: {
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      color: '#333333',
      fontSize: '16px',
      '&::placeholder': {
        color: '#888888',
      },
    },
    signUpButton: {
      marginRight: theme.spacing(2),
      height: 40,
      fontSize: 16,
      textTransform: 'none',
      color: 'black', // Set the text color to black
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    modeSwitch: {
      marginLeft: 'auto',
    },
    categoriesMenu: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    logo: {
      width: '100px',
      height: '80px',
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      zoom: '1.2',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  };
});

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoriesMenuAnchorEl, setCategoriesMenuAnchorEl] = useState(null);

  const { loading, data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];

  if (loading) {
    return <p>Loading...</p>;
  }

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCategoriesMenuOpen(event) {
    setCategoriesMenuAnchorEl(event.currentTarget);
  }

  function handleCloseMenus() {
    setAnchorEl(null);
    setCategoriesMenuAnchorEl(null);
  }

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <NavLink to='/'>
          <Typography variant='h6' className={classes.title}>
            <img src={LearnifyLogo} alt='Learnify' className={classes.logo} />
          </Typography>
        </NavLink>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        {/* Show buttons in navbar on full-size screens */}
        <Hidden smDown>
          <div className={classes.navButtons}>
            <NavLink to='/signup'>
              <Button
                variant='contained'
                color='inherit'
                className={classes.signUpButton}
              >
                Sign Up
              </Button>
            </NavLink>
            <NavLink to='/signin'>
              <Button
                variant='contained'
                color='inherit'
                className={classes.signUpButton}
              >
                Sign In
              </Button>
            </NavLink>
            <Button
              variant='contained'
              color='inherit'
              className={classes.categoriesMenu}
              onClick={handleCategoriesMenuOpen}
            >
              Categories
            </Button>
          </div>
        </Hidden>
        {/* Show buttons in dropdown menu on small screens */}
        <Hidden mdUp>
          <div className={classes.mobileButtons}>
            <Button
              variant='contained'
              color='inherit'
              className={classes.signUpButton}
              onClick={handleMenuOpen}
            >
              Sign Up
            </Button>
            <Button
              variant='contained'
              color='inherit'
              className={classes.signUpButton}
              onClick={handleMenuOpen}
            >
              Sign In
            </Button>
            <Button
              variant='contained'
              color='inherit'
              className={classes.categoriesMenu}
              onClick={handleCategoriesMenuOpen}
            >
              Categories
            </Button>
          </div>
        </Hidden>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenus}
        >
          <NavLink to='/signup' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Sign Up</MenuItem>
          </NavLink>
          <NavLink to='/signin' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Sign In</MenuItem>
          </NavLink>
        </Menu>
        <Menu
          anchorEl={categoriesMenuAnchorEl}
          keepMounted
          open={Boolean(categoriesMenuAnchorEl)}
          onClose={handleCloseMenus}
        >
          {categories.map((category) => (
            <NavLink
              to={'category/' + category.category}
              style={linkStyle}
              key={category.category}
            >
              <MenuItem onClick={handleCloseMenus}>{category.category}</MenuItem>
            </NavLink>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;