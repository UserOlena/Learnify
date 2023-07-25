import { React } from 'react';
import { useQuery } from '@apollo/client';
import { DashboardCarousel } from '../components';
import { QUERY_TUTORIALS_BY_CATEGORY } from '../utils/queries/tutorialQueries';
import { GET_USER } from '../utils/queries/userQueries';
import { useParams } from 'react-router-dom';


import Auth from '../utils/auth';

export function Category() {
    const { categoryId } = useParams();
    if (!Auth.loggedIn()) {
        window.location.assign('/signin');
    }

    const { loading: tutorialsLoading, data: tutorialsData } =
        useQuery(QUERY_TUTORIALS_BY_CATEGORY, {
            variables: { categoryId: categoryId },
        });
    
    const { data: userData } = useQuery(GET_USER);

    if (tutorialsLoading) {
        return <p>Loading...</p>;
    }

    const tutorials = tutorialsData.tutorialsByCategory;
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

export default Category;