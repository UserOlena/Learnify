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
  query GetTutorial($id: ID!) {
    tutorial(_id: $id) {
      _id
      title
      overview
      thumbnail
      categories {
        category
      }
      teacher {
        username
        _id
      }
      lessons {
        _id
        name
        body
        media
        duration
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
