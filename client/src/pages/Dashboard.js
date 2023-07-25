import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DashboardCarousel } from '../components';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

import Auth from '../utils/auth';

export function Dashboard() {
  if (!Auth.loggedIn()) {
    window.location.assign('/signin');
  }

  const { loading: tutorialsLoading, data: tutorialsData } =
    useQuery(GET_TUTORIALS);

  const { data: userData } = useQuery(GET_USER);

  if (tutorialsLoading) {
    return <p>Loading...</p>;
  }

  const tutorials = tutorialsData.tutorials;
  console.log(tutorials);

  return (
    <div>
      <DashboardCarousel
        items={tutorials}
        user={userData.me}
      />
    </div>
  );
}

export default Dashboard;
