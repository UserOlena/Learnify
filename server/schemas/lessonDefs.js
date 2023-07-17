const { gql } = require('apollo-server-express');

const { Lesson } = require('../models');

// TODO: Complete Lesson typeDefs
const lessonTypeDefs = gql`
  type Lesson {
    _id: ID!
    name: String!
    body: String!
    media: String
    duration: Int!
  }

  type Query {
    lessons: [Lesson]
    lesson(_id: ID!): Lesson
  }

  type Mutation {
    addLesson(name: String!, body: String!, media: String!, duration: Int!): Lesson
    updateLesson(lessonId: ID!, name: String, body: String media: String, duration: String): Lesson
    removeLesson(lessonId: ID!): Lesson
  }
`;

// TODO: Complete Resolvers for Lesson typeDefs
const lessonResolvers = {
  Query: {
    lessons: async () => {
      return await Lesson.find({});
    },
    lesson: 
        async (parent, { _id }) => {
            return await Lesson.findById(_id);
        },
  },

  Mutation: {
    addLesson:
    async (parent, { name, body, media, duration }) => {
      return await Lesson.create({name, body, media, duration });
    },
    
}
};

module.exports = { lessonTypeDefs, lessonResolvers };
