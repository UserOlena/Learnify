import { React, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  InputBase,
  Button,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      userSelect: 'none',
    },
    appBar: {
      backgroundColor: theme.palette.type === 'dark' ? 'gray' : 'white',
      color: 'black',
      opacity: '0.8',
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
    },
    modeSwitch: {
      marginLeft: 'auto',
    },
    categoriesMenu: {
      marginTop: theme.spacing(6),
    },
  };
});

function Navbar({ darkMode, onDarkModeChange }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          <img src='' alt='Learnify' className={classes.logo} />
        </Typography>
        <Button
          variant='contained'
          color='inherit'
          className={classes.signUpButton}
          onClick={handleMenuOpen}
        >
          Categories
        </Button>
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
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Category 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Category 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Category 3</MenuItem>
          </Menu>
        </div>
        <Button
          variant='contained'
          color='inherit'
          className={classes.signUpButton}
        >
          Sign Up
        </Button>
        <Button
          variant='contained'
          color='inherit'
          className={classes.signUpButton}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
