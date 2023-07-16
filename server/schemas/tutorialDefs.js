const { gql } = require('apollo-server-express');

// TODO: Complete Tutorial typeDefs
export const typeDefs = gql`
type Tutorial {
  _id: ID!
  
}

type Query {

}

type Mutation {
  
}
`;



// TODO: Complete Resolvers for Tutorial typeDefs
export const { 
    Tutorial, 
  } = require('../models');
  
  const resolvers = {
    
  };
  
