import { lessonTypes } from './typeDefs';
import { lessonResolvers, userResolvers } from './resolvers';
const { mergeStrings } = require('graphql-tools');

const typeDefs = mergeStrings([lessonTypes]);

const resolvers = mergeStrings([lessonResolvers, userResolvers])

module.exports = { typeDefs, resolvers }