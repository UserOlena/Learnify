// Syntax comes from https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

const { merge } = require('lodash');

const { categoryTypeDefs, categoryResolvers } = require('./categoryDefs.js');
const { lessonTypeDefs, lessonResolvers } = require('./lessonDefs.js');
const { reviewTypeDefs, reviewResolvers } = require('./reviewDefs.js');
const { tutorialTypeDefs, tutorialResolvers } = require('./tutorialDefs.js');
const { userTypeDefs, userResolvers } = require('./userDefs.js');

const typeDefs = [
  categoryTypeDefs, 
  lessonTypeDefs, 
  reviewTypeDefs, 
  tutorialTypeDefs, 
  userTypeDefs
];

const resolvers = merge(
  categoryResolvers, 
  lessonResolvers, 
  reviewResolvers, 
  tutorialResolvers, 
  userResolvers
);

module.exports = { typeDefs, resolvers };
