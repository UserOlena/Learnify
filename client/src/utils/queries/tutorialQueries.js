import { gql } from '@apollo/client';

export const GET_TUTORIALS = gql`
  {
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
query GetTutorial($_id: ID!) {
    tutorial(_id: $_id) {
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