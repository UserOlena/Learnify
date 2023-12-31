const { gql, AuthenticationError } = require('apollo-server-express');

const { Tutorial, Category } = require('../models');

const tutorialTypeDefs = gql`
  type Teacher {
    _id: ID!
    username: String
  }

  type Tutorial {
    _id: ID!
    title: String
    overview: String
    thumbnail: String
    categories: [Category]
    teacher: [Teacher]
    lessons: [Lesson]
    reviews: [Review]
    totalDuration: Int
    averageRating: Float
  }

  type Query {
    tutorials: [Tutorial]
    tutorial(_id: ID!): Tutorial
    tutorialsByCategory(categoryId: ID!): [Tutorial]
  }

  type Mutation {
    addTutorial(
      title: String!
      overview: String!
      thumbnail: String!
      categories: [ID]!
      teacher: [ID]!
    ): Tutorial
    updateTutorial(
      _id: ID!
      title: String
      overview: String
      thumbnail: String
      categories: [ID]
    ): Tutorial
    deleteTutorial(_id: ID!): Tutorial
  }
`;

const tutorialResolvers = {
  Query: {
    // Get all tutorials
    tutorials: async function () {
      try {
        return await Tutorial.find({})
          .populate('categories')
          .populate('teacher')
          .populate('lessons')
          .populate('reviews');
      } catch (error) {
        throw new Error(`Failed to fetch tutorials: ${error.message}`);
      }
    },

    // Get a single tutorial by ID
    tutorial: async function (parent, { _id }) {
      try {
        return await Tutorial.findById(_id)
          .populate('categories')
          .populate('teacher')
          .populate('lessons')
          .populate('reviews');
      } catch (error) {
        throw new Error(`Failed to fetch single tutorial: ${error.message}`);
      }
    },

    // Get all tutorials in a single category by category ID
    tutorialsByCategory: async function (parent, { categoryId }) {
      try {
        return await Tutorial.find({ categories: categoryId })
          .populate('categories')
          .populate('teacher')
          .populate('lessons')
          .populate('reviews');
      } catch (error) {
        throw new Error(
          `Failed to fetch tutorials by category: ${error.message}`
        );
      }
    },
  },

  Mutation: {
    // Add a tutorial
    addTutorial: async function (
      parent,
      { title, overview, thumbnail, categories, teacher },
      context
    ) {
      // If user is logged in, add the tutorial to the db
      if (context.user) {
        try {
          return await Tutorial.create({
            title,
            overview,
            thumbnail,
            categories,
            teacher,
          });
        } catch (error) {
          throw new Error(`Failed to add tutorial: ${error.message}`);
        }
      }
      // If user is not logged in, throw authentication error
      throw new AuthenticationError('User must be logged in to add a tutorial');
    },

    // Update a tutorial's title, overview, thumbnail, and/or categories
    updateTutorial: async function (
      parent,
      { _id, title, overview, thumbnail, categories }
    ) {
      try {
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
          { new: true }
        );
      } catch (error) {
        throw new Error(`Failed to update tutorial: ${error.message}`);
      }
    },

    // Delete a tutorial
    deleteTutorial: async function (parent, { _id }) {
      try {
        return await Tutorial.findByIdAndDelete(_id);
      } catch (error) {
        throw new Error(`Failed to delete tutorial: ${error.message}`);
      }
    },
  },
};

module.exports = { tutorialTypeDefs, tutorialResolvers };
