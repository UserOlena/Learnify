import { React, useState } from 'react';
import {
  AppBar,
  Divider,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  makeStyles,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, Link } from 'react-router-dom';
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
  divider: {
    backgroundColor: '#92b4d4',
    height: '2px',
  },
}));

export function Navbar() {
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

  function handleCloseMenus() {
    setAnchorEl(null);
    setCategoriesMenuAnchorEl(null);
  }
  function handleLogout() {
    Auth.logout();
    Auth.loggedIn(false);
    handleCloseMenus();
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
        <Divider className={classes.divider} />
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
            <Link to='/' style={linkStyle} onClick={handleLogout}>
              <MenuItem>Logout</MenuItem>
            </Link>
          </>
        )}
      </Menu>
    </AppBar>
  );
}

export default Navbar;
