import { React, useState } from 'react';
import { DashboardCarousel } from '../components';
import { Button } from '@material-ui/core';
import { makeStyles, useMediaQuery } from '@material-ui/core';

import { useQuery } from '@apollo/client';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    marginLeft: '2.5vw',
    color: 'rgba(0, 0, 0, 1)',
    boxSizing: 'border-box !important',
    userSelect: 'none',
  },
  button: {
    fontSize: 'calc(20px + (2 * ((100vw - 600px) / (1200 - 600))))',
    marginRight: '1vw',
    borderRadius: 0,
    textTransform: 'none',
    textShadow: 'none',
    boxSizing: 'border-box !important',
    heigth: '100%',
  },
  active: {
    borderBottom: 'solid 2px black',
  },
  welcome: {
    userSelect: 'none',
  },
}));

export function Dashboard() {
  const navigate = useNavigate();
  if (!Auth.loggedIn()) {
    navigate('/signin');
  }

  const classes = useStyles();

  const [chosenTab, setChosenTab] = useState('browse');

  const { loading: tutorialsLoading, data: tutorialsData } =
    useQuery(GET_TUTORIALS);

  const { loading: userDataIsLoading, data: userData } = useQuery(GET_USER);

  if (tutorialsLoading) {
    return <p>Loading...</p>;
  }

  if (userDataIsLoading) {
    return <p>Loading...</p>;
  }

  const tutorials = tutorialsData.tutorials;
  const featured = tutorials.toSorted(() => 0.5 - Math.random()).slice(0, 4);


  return (
    <div className={classes.welcome}>
      <h1>Welcome to Learnify{userData && userData.me && userData.me.username ? `, ${userData.me.username}!` : '!'}</h1>
      <div className={`${classes.buttonContainer}`}>
        <Button
          value='browse'
          className={`${classes.button} ${chosenTab === 'browse' ? classes.active : ''}`}
          onClick={(e) => setChosenTab(e.currentTarget.value)}
        >
          Browse
        </Button>
        <Button
          value='saved'
          className={`${classes.button} ${chosenTab === 'saved' ? classes.active : ''}`}
          onClick={(e) => setChosenTab(e.currentTarget.value)}
        >
          Saved
        </Button>
      </div>
      <DashboardCarousel
        items={tutorials}
        user={userData.me}
        chosenTab={chosenTab}
      />
      {chosenTab == 'browse' && (
        <>
          <div className={`${classes.buttonContainer}`}>
            <Button
              value='browse'
              className={`${classes.button} ${classes.active}`}
              onClick={(e) => setChosenTab(e.currentTarget.value)}
            >
              Featured Courses
            </Button>
          </div>
          <DashboardCarousel
            items={featured}
            user={userData.me}
            chosenTab={chosenTab}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;