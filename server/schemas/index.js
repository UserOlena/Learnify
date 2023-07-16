// syntax based on example located here: https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

import { merge } from 'lodash';

import { typeDefs as Category, resolvers as categoryResolvers } from './categoryDefs.js';
import { typeDefs as Lesson, resolvers as lessonResolvers } from './lessonDefs.js';
import { typeDefs as Review, resolvers as reviewResolvers } from './reviewDefs.js';
import { typeDefs as Tutorial, resolvers as tutorialResolvers } from './tutorialDefs.js';
import { typeDefs as User, resolvers as userResolvers } from './userDefs.js';



makeExecutableSchema({
  typeDefs: [ Query, Category, Lesson, Review, Tutorial, User ],
  resolvers: merge(resolvers, categoryResolvers, lessonResolvers, reviewResolvers, tutorialResolvers, userResolvers)
});
