const { Lesson } = require('../models')
const { gql } = require('apollo-server-express');

const lessonTypes = gql`
  type Lesson {
    _id: ID!
    name: String!
    body: String!
    media: String
    duration: Int!
  }

  extend type Query {
    lesson(id: ID!): Lesson
    lessons: [Lesson]
  }

  extend type Mutation {
    addLesson(name: String!, body: String!, media: String, duration: Int!): Lesson
    updateLesson(lessonId: ID!, name: String, body: String media: String, duration: String): Lesson
    removeLesson(lessonId: ID!): Lesson
    remove
  }
`;

const lessonResolvers = {
    Query: {
        lesson: 
        async (parent, args) => {
            return await Lesson.findbyId(args.id);
        },
        lessons: 
        async () => {
            return await Lesson.find({}).populate('name').populate({path: 'lessons', populate: 'duration' });
        },
    },
    Mutation: {
        addLesson:
        async (parent, { name, body, media, duration }) => {
          return await Lesson.create({name, body, media, duration });
        },
        updateLesson:
        async (parent, { id, name, body, media, duration }) => {
          const updateFields = {};
            if (name) {
              updateFields.name = name;
            }
            if (body) {
              updateFields.body = body;
            }
            if (media) {
              updateFields.media = media;
            }
            if (duration) {
              updateFields.duration = duration;
            }
          return await Lesson.findOneAndUpdate({_id: id }, updateFields, {new: true });
        }
    }
  };

module.exports = { lessonTypes, lessonResolvers };