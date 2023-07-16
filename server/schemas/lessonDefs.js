const { gql } = require('apollo-server-express');
const { 
    Lesson, 
  } = require('../models');

// TODO: Complete Lesson typeDefs, queries, mutations
export const typeDefs = gql`
type Lesson {
  _id: ID!
  
}

type Query {

}

type Mutation {
  
}
`;


// TODO: Complete Resolvers for Lesson typeDefs
  
  export const resolvers = {
    
  };
  
