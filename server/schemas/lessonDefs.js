const { gql } = require('apollo-server-express');

// TODO: Complete Lesson typeDefs
const typeDefs = gql`
  type Lesson {
    _id: ID!
    
  }


`;

module.exports = typeDefs;

// TODO: Complete Resolvers for Lesson typeDefs
const { 
    Lesson, 
  } = require('../models');
  
  const resolvers = {
    
  };
  
  module.exports = resolvers;