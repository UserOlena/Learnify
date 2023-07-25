import { gql } from '@apollo/client';

export const ADD_TUTORIAL = gql`
  mutation addTutorial(
    $title: String!
    $overview: String!
    $thumbnail: String!
    $categories: [ID]!
    $teacher: [ID]!
  ) {
    addTutorial(
      title: $title
      overview: $overview
      thumbnail: $thumbnail
      categories: $categories
      teacher: $teacher
    ) {
      _id
      overview
      thumbnail
      title
      categories {
        category
        _id
      }
      teacher {
        _id
        username
      }
    }
  }
`;

// delete tutorial
export const DELETE_TUTORIAL = gql`
  mutation deleteTutorial($_id: ID!) {
    deleteTutorial(_id: $_id) {
      _id
    }
  }
`;
