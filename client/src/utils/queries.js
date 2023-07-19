import { gql } from '@apollo/client';

export const QUERY_TUTORIALS = gql`
    { tutorials {
        _id
        title
        overview
    }}
`;


