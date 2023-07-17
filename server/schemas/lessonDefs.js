const { gql } = require('apollo-server-express');

const { Lesson } = require('../models');

// TODO: Complete Lesson typeDefs
const lessonTypeDefs = gql`
  type Lesson {
    _id: ID!
    name: String!
    body: String!
    media: String
    duration: Int!
  }

  type Query {
    lessons: [Lesson]
  }
`;

// TODO: Complete Resolvers for Lesson typeDefs
const lessonResolvers = {
  Query: {
    lessons: async () => {
      return await Lesson.find({});
    }
  }
};

module.exports = { lessonTypeDefs, lessonResolvers };
