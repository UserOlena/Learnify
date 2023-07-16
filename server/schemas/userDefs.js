const { gql } = require('apollo-server-express');

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

module.exports = typeDefs;

// Resolvers for User typeDefs
const { 
    User, 
  } = require('../models');
  
  const resolvers = {
    Query: {
      user: async (parent, { _id }) => {
        const params = _id ? { _id } : {};
        return User.find(params);
      },
    },
  };
  
  module.exports = resolvers;