import { React, useState } from 'react';
import { useQuery } from '@apollo/client';
import { DashboardCarousel } from '../components';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';

export function Dashboard() {
  const { loading, data } = useQuery(GET_TUTORIALS);

  if (loading) {
    return <p>Loading...</p>;
  }

  const tutorials = data.tutorials;
  console.log(tutorials);

  return (
    <div>
      <DashboardCarousel
        items={tutorials}
      />
    </div>
  );
}

export default Dashboard;
