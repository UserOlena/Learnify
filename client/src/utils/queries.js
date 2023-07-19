import { gql } from '@apollo/client';

export const QUERY_TUTORIALS = gql`
    { tutorials {
        _id
        title
        overview
        thumbnail
    }}
`;

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            _id
            category
        }
    }
`
