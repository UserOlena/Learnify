const { gql } = require('apollo-server-express');

// TODO: Complete Tutorial typeDefs
const typeDefs = gql`
type Tutorial {
  _id: ID!
  
}

type Query {

}

type Mutation {
  
}
`;

module.exports = typeDefs;

// TODO: Complete Resolvers for Tutorial typeDefs
const { 
    Tutorial, 
  } = require('../models');
  
  const resolvers = {
    
  };
  
  module.exports = resolvers;