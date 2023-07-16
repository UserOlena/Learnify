const { gql } = require('apollo-server-express');
const { 
    User, 
  } = require('../models');

// User typeDefs
const typeDefs = gql`
type User {
  _id: ID!
  
}

type Query {

}

type Mutation {
  
}
`;


// Resolvers for User typeDefs
  
  export const resolvers = {
    Query: {
      user: async (parent, { _id }) => {
        const params = _id ? { _id } : {};
        return User.find(params);
      },
    },
  };
  
