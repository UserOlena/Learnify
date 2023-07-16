const { gql } = require('apollo-server-express');

const { Tutorial } = require('../models');

// TODO: Complete Tutorial typeDefs
const tutorialTypeDefs = gql`
  type Tutorial {
    _id: ID!
    
  }

  type Query {
    tutorial(_id: ID!): Tutorial!
  }
`;

// TODO: Complete Resolvers for Tutorial typeDefs
// const tutorialResolvers = {
  
// };

module.exports = {
  tutorialTypeDefs,
  // tutorialResolvers,
}