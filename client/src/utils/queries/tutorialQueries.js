import { gql } from '@apollo/client';

export const QUERY_TUTORIALS = gql`
  {
    tutorials {
      _id
      title
      overview
      thumbnail
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