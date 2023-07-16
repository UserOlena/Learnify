const { gql } = require('apollo-server-express');

const { Review } = require('../models');

// TODO: Complete Review typeDefs
const reviewTypeDefs = gql`
  type Review {
    _id: ID!
    rating: Float
    comment: String
  }

  type Query {
    reviews: [Review]
  }
`;

// TODO: Complete Resolvers for Review typeDefs
const reviewResolvers = {
  Query: {
    reviews: async () => {
      return await Review.find({});
    }
  }
};

module.exports = { reviewTypeDefs, reviewResolvers };
