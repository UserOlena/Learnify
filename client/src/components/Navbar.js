import { React, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  InputBase,
  IconButton,
  makeStyles,
  Grid,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries/categoryQueries';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#FAF0E6',
    color: 'black',
    opacity: '0.7',
    height: '60px',
    userSelect: 'none',
  },
  logo: {
    width: '100px',
    height: '80px',
    zoom: '1.2',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
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
  navButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoriesMenu: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
  searchOpen: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1300px',
    margin: '0 auto',
    backgroundColor: 'inherit', // Set the background color to inherit the app bar color
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

export function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoriesMenuAnchorEl, setCategoriesMenuAnchorEl] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  function handleCloseMenus() {
    setAnchorEl(null);
    setCategoriesMenuAnchorEl(null);
  }

  function handleSearchClick() {
    // Only show the search bar when it's not already open
    if (!showSearchBar) {
      setShowSearchBar(true);
    }
  }

  function handleMenuItemKeyDown(event) {
    // Prevent event propagation to parent elements when interacting with the search bar
    event.stopPropagation();

    if (event.key === 'Enter' && !showSearchBar) {
      handleCloseMenus();
    }
  }

  function handleSearchKeyDown(event) {
    // Prevent event propagation to parent elements when interacting with the search bar
    event.stopPropagation();
  }

  function handleSearchClose() {
    setShowSearchBar(false);
  }

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item>
            <NavLink to='/' style={linkStyle}>
              <Typography variant='h6'>
                <img
                  src={LearnifyLogo}
                  alt='Learnify'
                  className={classes.logo}
                />
              </Typography>
            </NavLink>
          </Grid>
          <Grid item>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenus}
      >
        {categories
          .slice()
          .sort((a, b) => a.category.localeCompare(b.category))
          .map((category) => (
            <NavLink
              to={'/category/' + category.category}
              style={linkStyle}
              key={category.category}
            >
              <MenuItem onClick={handleCloseMenus}>
                {category.category}
              </MenuItem>
            </NavLink>
          ))}
        {!Auth.loggedIn() && (
          <>
          <NavLink to='/signup' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Sign Up</MenuItem>
          </NavLink>
          <NavLink to='/signin' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Sign In</MenuItem>
          </NavLink>
          </>
        )}
        {Auth.loggedIn() && (
          <>
          <NavLink to='/dashboard' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Dashboard</MenuItem>
          </NavLink>
          <NavLink to='/userProfile' style={linkStyle}>
            <MenuItem onClick={handleCloseMenus}>Settings</MenuItem>
          </NavLink>
        </>
        )}
        <MenuItem
          onClick={handleSearchClick}
          onKeyDown={handleMenuItemKeyDown}
          tabIndex={showSearchBar ? -1 : 0}
        >
          <ListItemIcon>
            <SearchIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary='Search' />
        </MenuItem>
        {showSearchBar && (
          <MenuItem onClick={handleSearchClick}>
            <div className={classes.searchOpen}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{ color: '#888888' }} />
              </div>
              <InputBase
                placeholder='Search...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onBlur={handleSearchClose}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
          </MenuItem>
        )}
      </Menu>
    </AppBar>
  );
}

export default Navbar;
