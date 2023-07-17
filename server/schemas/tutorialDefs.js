const { gql } = require('apollo-server-express');

const { Tutorial, Category } = require('../models');

const tutorialTypeDefs = gql`
  type Tutorial {
    _id: ID!
    title: String
    overview: String
    thumbnail: String
    categories: [Category]
    teacher: [User]
    lessons: [Lesson]
    reviews: [Review]
    totalDuration: Int
  }

  type Query {
    tutorials: [Tutorial]
    tutorial(_id: ID!): Tutorial
    tutorialsByCategory(categoryId: ID!): [Tutorial]
  }

  type Mutation {
    addTutorial(title: String!, overview: String!, thumbnail: String!, categories: [ID]!, teacher: [ID]!): Tutorial
    updateTutorial(_id: ID!, title: String, overview: String, thumbnail: String, categories: [ID]): Tutorial
    deleteTutorial(_id: ID!): Tutorial
  }
`;

const tutorialResolvers = {
  Query: {
    // Get all tutorials
    tutorials: async () => {
      return await Tutorial.find({})
        .populate('categories')
        .populate('teacher')
        .populate('lessons')
        .populate('reviews');
    },

    // Get a single tutorial by ID
    tutorial: async (parent, { _id }) => {
      return await Tutorial.findById(_id)
        .populate('categories')
        .populate('teacher')
        .populate('lessons')
        .populate('reviews');
    },

    // Get all tutorials in a single category by category ID
    tutorialsByCategory: async function (parent, { categoryId }) {
      try {
        return await Tutorial.find({ categories: categoryId });
      } catch (error) {
        throw new Error(`Failed to fetch tutorials by category: ${error.message}`);
      }
    },
  },
  
  Mutation: {
    // Add a tutorial
    addTutorial: async (parent, { title, overview, thumbnail, categories, teacher }) => {
      return await Tutorial.create({ title, overview, thumbnail, categories, teacher });
    },

    // Update a tutorial's title, overview, thumbnail, and/or categories
    updateTutorial: async (parent, { _id, title, overview, thumbnail, categories }) => {
      // Create an updates object only containing the updated fields
      const updates = {};
      if (title) {
        updates.title = title;
      }
      if (overview) {
        updates.overview = overview;
      }
      if (thumbnail) {
        updates.thumbnail = thumbnail;
      }
      if (categories) {
        updates.categories = categories;
      }

      return await Tutorial.findByIdAndUpdate(
        _id,
        { $set: updates },
        { new: true },
      );
    },

    // Delete a tutorial
    deleteTutorial: async (parent, { _id }) => {
      return await Tutorial.findByIdAndDelete(_id);
    }
  }
};

module.exports = { tutorialTypeDefs, tutorialResolvers };
