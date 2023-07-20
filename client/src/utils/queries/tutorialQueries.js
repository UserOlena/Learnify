import { gql } from '@apollo/client';

export const GET_TUTORIALS = gql`
  query GetTutorials {
    tutorials {
      _id
      title
      overview
      thumbnail
    }
  }
`;

//get single tutorial
export const GET_TUTORIAL = gql`
  query GetTutorial($tutorialId: ID!) {
    tutorial(_id: $id) {
      _id
      title
      overview
      thumbnail
      categories {
        _id
        name
      }
      teacher {
        _id
        username
      }
      lessons {
        _id
        title
      }
      reviews {
        _id
        rating
        comment
      }
      totalDuration
    }
  }
`;
