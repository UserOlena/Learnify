import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Recommendations from '../components/Recommended';
import Categories from '../components/Categories';
import Footer from '../components/Footer';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeChange = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#6A0DAD' : '#FFFFFF',
      },
      secondary: {
        main: darkMode ? '#FFFFFF' : '#000000',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#000000',
      },
      background: {
        default: darkMode ? '#333333' : '#FFFFFF',
      },
    },
  });

  const rootClassName = darkMode ? 'dark-mode' : 'light-mode';

  return (
    <ThemeProvider theme={theme}>
      <div className={rootClassName}>
        <Navbar darkMode={darkMode} onDarkModeChange={handleDarkModeChange} />
        <Carousel />
        <Recommendations />
        <Categories />
        <Footer />
      </div>
    </ThemeProvider>
    
  );
};

export default Home;
