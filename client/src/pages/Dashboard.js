import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DashboardCarousel } from '../components';
import { GET_TUTORIALS } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';

export function Dashboard() {
  const { loading: tutorialsLoading, data: tutorialsData } =
    useQuery(GET_TUTORIALS);

  const { loading: userLoading, data: userData } = useQuery(GET_USER);

  // State to store the username
  const [username, setUsername] = useState('');

  if (tutorialsLoading || userLoading) {
    return <p>Loading...</p>;
  }

  const tutorials = tutorialsData.tutorials;
  console.log(tutorials);

  const user = userData.me;
  console.log(user);

  // Function to update the username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Welcome to Learnify{user && user.username ? `, ${user.username}!` : '!'}</h1>
      <DashboardCarousel items={tutorials} />
    </div>
  );
}

export default Dashboard;
