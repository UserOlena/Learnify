const { gql } = require('apollo-server-express');

const { User } = require('../models');

// User typeDefs
const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
  }

  type Query {
    user(_id: ID!): User!
  }
`;

// Resolvers for User typeDefs
const userResolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
}