import { gql } from '@apollo/client';

export const ADD_LESSON = gql`
  mutation addLesson(
    $name: String!
    $body: String!
    $duration: Int!
    $media: String
    $tutorialId: ID!
  ) {
    addLesson(
      name: $name
      body: $body
      duration: $duration
      media: $media
      tutorialId: $tutorialId
    ) {
      _id
      body
      duration
      media
      name
    }
  }
`;

// delete lesson
export const DELETE_LESSON = gql`
  mutation deleteLesson($_id: ID!) {
    deleteLesson(_id: $_id) {
      _id
    }
  }
`;

