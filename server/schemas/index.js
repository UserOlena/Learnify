const { gql } = require('apollo-server-express');

// import { merge } from 'lodash';
const merge = require('lodash');

// import { makeExecutableSchema } from 'apollo-server-express';

// import { typeDef as Category, resolvers as categoryResolvers } from './categoryDefs.js';
// import { typeDef as Lesson, resolvers as lessonResolvers } from './lessonDefs.js';
// import { typeDef as Review, resolvers as reviewResolvers } from './reviewDefs.js';
// import { typeDef as Tutorial, resolvers as tutorialResolvers } from './tutorialDefs.js';
// import { typeDef as User, resolvers as userResolvers } from './userDefs.js';
const { categoryTypeDefs, categoryResolvers } = require('./categoryDefs.js');
// const { lessonTypeDefs, lessonResolvers } = require('./lessonDefs.js');
// const { reviewTypeDefs, reviewResolvers } = require('./reviewDefs.js');
// const { tutorialTypeDefs, tutorialResolvers } = require('./tutorialDefs.js');
const { userTypeDefs, userResolvers } = require('./userDefs.js');

// const { categoryTypeDefs } = require('./categoryDefs.js');
const { lessonTypeDefs } = require('./lessonDefs.js');
const { reviewTypeDefs } = require('./reviewDefs.js');
const { tutorialTypeDefs } = require('./tutorialDefs.js');
// const { userTypeDefs } = require('./userDefs.js');

const Query = gql`
  type Query {
    _empty: String
  }
`;

const typeDefs = [Query, categoryTypeDefs, lessonTypeDefs, reviewTypeDefs, tutorialTypeDefs, userTypeDefs];
const resolvers = merge(categoryResolvers, userResolvers);

module.exports = {
  typeDefs,
  resolvers,
};
