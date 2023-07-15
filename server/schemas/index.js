// syntax based on example located here: https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/

import { merge } from 'lodash';

import { typeDef as Category, resolvers as categoryResolvers } from './categoryDefs.js';
import { typeDef as Lesson, resolvers as lessonResolvers } from './lessonDefs.js';
import { typeDef as Review, resolvers as reviewResolvers } from './reviewDefs.js';
import { typeDef as Tutorial, resolvers as tutorialResolvers } from './tutorialDefs.js';
import { typeDef as User, resolvers as userResolvers } from './userDefs.js';

const Query = `
  type Query {
    category(_id: ID!): Category!
    lesson(_id: ID!): Lesson!
    review(_id: ID!): Review!
    tutorial(_id: ID!): User!
    user(_id: ID!): User!
  }
`;

makeExecutableSchema({
  typeDefs: [ Query, Category, Lesson, Review, Tutorial, User ],
  resolvers: merge(resolvers, categoryResolvers, lessonResolvers, reviewResolvers, tutorialResolvers, userResolvers)
});
