const { gql } = require('apollo-server-express');
const { 
    Category, 
  } = require('../models');

// TODO: Complete Category typeDefs, Queries, Mutations
export const typeDefs = gql`
  type Category {
    _id: ID!
    
  }

  type Query {

  }

  type Mutation {
    
  }
`;




// TODO: Complete Resolvers for Category typeDefs
  
  export const resolvers = {
    
  };
  