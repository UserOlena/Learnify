const { gql } = require('apollo-server-express');

const { Category } = require('../models');

// TODO: Complete Category typeDefs
const categoryTypeDefs = gql`
  type Category {
    _id: ID!
    category: String
  }

  type Query {
    categories: [Category]
  }
`;

// TODO: Complete Resolvers for Category typeDefs
const categoryResolvers = {
  Query: {
    categories: async () => {
      return await Category.find({});
    }
  }
};
  
module.exports = { categoryTypeDefs, categoryResolvers };
