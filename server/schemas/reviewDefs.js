const { gql } = require('apollo-server-express');
const { 
    Review, 
  } = require('../models');

// TODO: Complete Review typeDefs, queries, mutations
export const typeDefs = gql`
type Review {
  _id: ID!
  
}

type Query {

}

type Mutation {
  
}
`;


// TODO: Complete Resolvers for Review typeDefs
  
export const resolvers = {
    
  };
  
