const { gql } = require('apollo-server-express');

const { Tutorial } = require('../models');

// TODO: Complete Tutorial typeDefs
const tutorialTypeDefs = gql`
  type Tutorial {
    _id: ID!
    title: String
    overview: String
    thumbnail: String
    categories: [Category]
    teacherId: [User]
    lessons: [Lesson]
    reviews: [Review]
  }

  type Query {
    tutorials: [Tutorial]
  }
`;

// TODO: Complete Resolvers for Tutorial typeDefs
const tutorialResolvers = {
  Query: {
    tutorials: async () => {
      return await Tutorial.find({})
        .populate('categories')
        .populate('teacherId')
        .populate('lessons')
        .populate('reviews');
    }
  }
};

module.exports = { tutorialTypeDefs, tutorialResolvers };
