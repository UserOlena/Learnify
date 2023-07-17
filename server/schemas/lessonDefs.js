const { gql } = require('apollo-server-express');

const { Lesson } = require('../models');

// TODO: Complete Lesson typeDefs
const lessonTypeDefs = gql`
  type Lesson {
    _id: ID!
    name: String
    body: String
    media: String
    duration: Int
  }

  type Query {
    lessons: [Lesson]
    lesson(_id: ID!): Lesson
  }

  type Mutation {
    addLesson(name: String!, body: String!, media: String, duration: Int!): Lesson

    updateLesson(_id: ID!, name: String, body: String media: String, duration: String): Lesson
    
    deleteLesson(_id: ID!): Lesson
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
    //ADD a new lesson
    addLesson: async (parent, { name, body, media, duration }) => {
      return await Lesson.create({name, body, media, duration });
    },
    //UPDATE an existing lesson
    updateLesson: async (parent, {_id, name, body, media, duration}) => {
      //create object containing only field(s) to be updated
      const updates = {};
      if (name) {
        updates.name = name;
      }
      if (body) {
        updates.body = body;
      }
      if (media) {
        updates.media = media;
      }
      if (duration) {
        updates.duration = duration;
      }

      return await Lesson.findByIdAndUpdate(
        _id, 
        { $set: updates }, 
        {new: true }
        );
    },

    //DELETE a lesson
    deleteLesson: async (parent, {_id}) => {
      return await Lesson.findByIdAndDelete(_id);
    }
}
};

module.exports = { lessonTypeDefs, lessonResolvers };
