import React from 'react';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';
import { NavLink } from 'react-router-dom';

export function Footer() {
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
        < NavLink to='/about' style={{ color: 'white', marginRight: '10px' }}>
          About
        </NavLink>
        <NavLink to='/careers' style={{ color: 'white', marginRight: '10px' }}>
          Careers
        </NavLink>
        <NavLink to='/donate' style={{ color: 'white' }}>
          Donate
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
