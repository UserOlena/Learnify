const { gql } = require('apollo-server-express');

// TODO: Complete Review typeDefs
const typeDefs = gql`
  type Review {
    _id: ID!
    
  }


`;

module.exports = typeDefs;

// TODO: Complete Resolvers for Review typeDefs
const { 
    Review, 
  } = require('../models');
  
  const resolvers = {
    
  };
  
  module.exports = resolvers;