import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation addReview(
    $tutorialId: String! 
    $username: String
    $rating: Int 
    $comment: String
    ) {
    addReview(
      tutorialId: $tutorialId
      username: $username
      rating: $rating
      comment: $comment
      ) {
      _id
      username
      rating
      comment
    }
  }
`;
