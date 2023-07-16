const { gql } = require('apollo-server-express');

const { Lesson } = require('../models');

// TODO: Complete Lesson typeDefs
const lessonTypeDefs = gql`
  type Lesson {
    _id: ID!
    
  }

  type Query {
    lesson(_id: ID!): Lesson!
  }
`;

// TODO: Complete Resolvers for Lesson typeDefs
// const lessonResolvers = {
  
// };

module.exports = {
  lessonTypeDefs,
  // lessonResolvers,
}