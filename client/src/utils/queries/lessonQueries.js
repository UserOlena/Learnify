import { gql } from '@apollo/client';

//get single lesson
export const GET_LESSON = gql`
query Query($id: ID!) {
    lesson(_id: $id) {
      _id
      name
      body
      media
      duration
    }
  }
`;