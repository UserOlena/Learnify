const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Lesson {
    _id: ID!
    body: String!
    media: String
    duration: Int!
  }
  
  type User {
    _id: ID!
    username: String
    email: String
    password: String
  }

  type Query {
    user(_id: ID!): User!
    lessons: [Lesson]
  }
`;

module.exports = typeDefs;
