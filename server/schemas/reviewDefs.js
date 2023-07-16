const { gql } = require('apollo-server-express');

const { Review } = require('../models');

// TODO: Complete Review typeDefs
const reviewTypeDefs = gql`
  type Review {
    _id: ID!
    
  }

  type Query {
    review(_id: ID!): Review!
  }
`;

// TODO: Complete Resolvers for Review typeDefs
// const reviewResolvers = {
  
// };

module.exports = {
  reviewTypeDefs,
  // reviewResolvers,
}