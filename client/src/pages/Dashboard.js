import { React, useState } from 'react';
import { DashboardCarousel } from '../components';
import { Button } from '@material-ui/core';
import { makeStyles, useMediaQuery } from '@material-ui/core';

import { useQuery } from '@apollo/client';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    marginLeft: '2.5vw',
    color: 'rgba(0, 0, 0, 1)',
    boxSizing: 'border-box !important',
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
}));

export function Dashboard() {
  if (!Auth.loggedIn()) {
    window.location.assign('/signin');
  }

  const classes = useStyles();

  const [chosenTab, setChosenTab] = useState('browseBtn');

  function changeChoosenTabState(tab) {}

  const { loading: tutorialsLoading, data: tutorialsData } =
    useQuery(GET_TUTORIALS);

  const { data: userData } = useQuery(GET_USER);

  if (tutorialsLoading) {
    return <p>Loading...</p>;
  }

  const tutorials = tutorialsData.tutorials;

  return (
    <div>
      <div className={`${classes.buttonContainer}`}>
        <Button
          className={`${classes.button} ${
            chosenTab === 'browseBtn' ? classes.active : ''
          }`}
        >
          Browse
        </Button>
        <Button className={`${classes.button}`}>Saved</Button>
      </div>
      <DashboardCarousel
        items={tutorials}
        user={userData.me}
        chosenTab={chosenTab}
      />
    </div>
  );
}

export default Dashboard;
