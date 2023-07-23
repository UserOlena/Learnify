import React from 'react';
import { NavLink } from 'react-router-dom';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={LearnifyLogo}
          alt='Company Logo'
          style={{ width: '80px', marginRight: '10px' }}
        />
        <p>&copy; {currentYear} Learnify. All rights reserved.</p>
      </div>
      <div style={{ marginTop: '10px' }}>
        <NavLink to= '/about'style={{ color: 'white', marginRight: '10px' }} >  
          About
        </NavLink>
        <a href='/careers' style={{ color: 'white', marginRight: '10px' }}>
          Careers
        </a>
        <a href='/who-we-are' style={{ color: 'white' }}>
          Who We Are
        </a>
      </div>
    </footer>
  );
}

export default Footer;
