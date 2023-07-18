import { gql } from '@apollo/client';

export const QUEREY_TUTORIALS = gql`
    { tutorials {
        _id
        title
        overview
    }}
`;


