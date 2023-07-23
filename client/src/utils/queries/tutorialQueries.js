import { gql } from '@apollo/client';

export const GET_TUTORIALS = gql`
  query GetTutorials {
    tutorials {
      _id
      title
      overview
      thumbnail
      teacher {
        username
      }
      totalDuration
      averageRating
    }
  }
`;

//get single tutorial
export const GET_TUTORIAL = gql`
  query GetTutorial($tutorialId: ID!) {
    tutorial(_id: $tutorialId) {
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
      averageRating
    }
  }
`;

//Tutorials by category
export const QUERY_TUTORIALS_BY_CATEGORY = gql`
  query GetTutorialsByCategory($categoryId: ID!) {
    tutorialsByCategory(categoryId: $categoryId) {
      _id
      title
      overview
      thumbnail
    }
  }
`;