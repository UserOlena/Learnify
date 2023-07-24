import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview(
    $tutorialId: ID! 
    $reviewer: ID!
    $rating: Int 
    $comment: String
    ) {
    addReview(
      tutorialId: $tutorialId
      reviewer: $reviewer
      rating: $rating
      comment: $comment
      ) {
      _id
      reviewer {
        _id
        username
      }
      rating
      comment
    }
  }
`;
