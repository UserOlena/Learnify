import { gql } from '@apollo/client';

export const ADD_LESSON = gql`
  mutation addLesson($name: String!, $body: String!, $duration: Int!, $media: String, $tutorialId: ID!) {
    addLesson(name: $name, body: $body, duration: $duration, media: $media, tutorialId: $tutorialId) {
      _id
      body
      duration
      media
      name
    }
  }
`;
