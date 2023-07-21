import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    me {
      _id
      username
      email
      tutorials {
        _id
        title
        overview
        thumbnail
        categories {
          _id
          category
        }
        teacher {
          _id
          username
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
  }
`;
