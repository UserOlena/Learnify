import React from 'react';
import LearnifyLogo from '../images/learnify-logo__1_-removebg.png';

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
        <a href='/about' style={{ color: 'white', marginRight: '10px' }}>
          About
        </a>
        <a href='/careers' style={{ color: 'white', marginRight: '10px' }}>
          Careers
        </a>
        <a href='/donate' style={{ color: 'white' }}>
          Donate
        </a>
      </div>
    </footer>
  );
}

export default Footer;
