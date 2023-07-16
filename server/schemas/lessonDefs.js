const { gql } = require('apollo-server-express');

//Lesson typeDefs
const typeDefs = gql`
  type Lesson {
    _id: ID!
    body: String!
    media: String
    duration: Int!  
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