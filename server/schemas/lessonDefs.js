const { gql } = require('apollo-server-express');

const { Lesson, Tutorial } = require('../models');

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
    addLesson(
      tutorialId: ID!
      name: String!
      body: String!
      media: String
      duration: Int!
    ): Lesson

    updateLesson(
      _id: ID!
      name: String
      body: String
      media: String
      duration: Int
    ): Lesson

    deleteLesson(_id: ID!): Lesson
  }
`;

//Resolvers for Lesson typeDefs
const lessonResolvers = {
  Query: {
    //get all lessons
    lessons: async function () {
      try {
        return await Lesson.find({});
      } catch (error) {
        throw new Error(`Failed to retrieve lessons: ${error.message}`);
      }
    },
    //get a single lesson by id
    lesson: async function (parent, { _id }) {
      try {
        return await Lesson.findById(_id);
      } catch (error) {
        throw new Error(`Failed to retrieve lesson: ${error.message}`);
      }
    },
  },

  Mutation: {
    //ADD a new lesson and attach it to its tutorial
    addLesson: async function (
      parent,
      { tutorialId, name, body, media, duration }
    ) {
      try {
        const newLesson = await Lesson.create({ name, body, media, duration });

        await Tutorial.findByIdAndUpdate(
          tutorialId,
          { $push: { lessons: newLesson._id } },
          { new: true }
        );

        return newLesson;
      } catch (error) {
        throw new Error(`Failed to add lesson: ${error.message}`);
      }
    },

    //UPDATE one or more fields for an existing lesson
    updateLesson: async function (
      parent,
      { _id, name, body, media, duration }
    ) {
      try {
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
          { new: true }
        );
      } catch (error) {
        throw new Error(`Failed to update lesson: ${error.message}`);
      }
    },

    //DELETE a lesson
    deleteLesson: async function (parent, { _id }) {
      try {
        return await Lesson.findByIdAndDelete(_id);
      } catch (error) {
        throw new Error(`Failed to delete lesson: ${error.message}`);
      }
    },
  },
};

module.exports = { lessonTypeDefs, lessonResolvers };
