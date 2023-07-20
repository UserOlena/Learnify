import { gql } from '@apollo/client';

export const GET_TUTORIAL = gql`
  query GetTutorial {
    tutorial {
      _id
      title
      overview
      thumbnail
      categories
      teacher
      lessons
      reviews
      totalDuration
    }
  }
`;