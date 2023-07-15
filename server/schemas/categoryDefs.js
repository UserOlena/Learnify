const { gql } = require('apollo-server-express');

// TODO: Complete Category typeDefs
const typeDefs = gql`
  type Category {
    _id: ID!
    
  }


`;

module.exports = typeDefs;

// TODO: Complete Resolvers for Category typeDefs
const { 
    Category, 
  } = require('../models');
  
  const resolvers = {
    
  };
  
  module.exports = resolvers;