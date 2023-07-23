import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation Mutation($tutorialId: String!, $rating: Int, $comment: String) {
    addReview(tutorialId: $tutorialId, rating: $rating, comment: $comment) {
      _id
      rating
      comment
    }
  }
`;
