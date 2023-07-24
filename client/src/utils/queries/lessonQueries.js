import { gql } from '@apollo/client';

//get single lesson
export const GET_LESSON = gql`
  query Query($lessonId: ID!) {
    lesson(_id: $lessonId) {
      _id
      name
      body
      media
      duration
    }
  }
`;
