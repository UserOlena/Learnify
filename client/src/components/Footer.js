import React from 'react';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';
import { NavLink } from 'react-router-dom';
import { Container, Grid, Typography } from '@material-ui/core';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: '#a5aaad', color: 'white', marginTop:'3%'}}
    >
      <Grid container xs={12} alignItems='center'>
      
      <Grid item xs={1}>
        <img
          src={LearnifyLogo}
          alt='Company Logo'
          style={{ width: '80px', marginRight: '2%' }}
        />
        </Grid>
        <Grid item xs={3}>
        </Grid>        
      <Grid item xs={4}>
        < NavLink to='/about' style={{ color: 'white', marginRight: '10px' }}>
          About
        </NavLink>
        <NavLink to='/careers' style={{ color: 'white', marginRight: '10px' }}>
          Careers
        </NavLink>
        <NavLink to='/donate' style={{ color: 'white' }}>
          Donate
        </NavLink>
      </Grid>
      <Grid item xs={4}></Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
