const { gql } = require('apollo-server-express');

const { User } = require('../models');

// TODO: Complete User typeDefs
const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    user(_id: ID!): User!
  }
`;

// TODO: Complete Resolvers for User typeDefs
const userResolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (parent, { _id }) => {
      return await User.findById(_id);
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
