const { gql } = require('apollo-server-express');

const { Review, Tutorial } = require('../models');

const reviewTypeDefs = gql`
  type Review {
    _id: ID!
    username: [User]
    rating: Int
    comment: String
  }

  type Query {
    reviews: [Review]
    review(_id: ID!): Review
  }

  type Mutation {
    addReview(tutorialId: String!, username: String!, rating: Int, comment: String): Review
    updateReview(_id: ID!, rating: Int, comment: String): Review
    deleteReview(_id: ID!): Review
  }
`;

const reviewResolvers = {
  Query: {
    // Get all reviews
    reviews: async function () {
      try {
        return await Review.find({});
      } catch (error) {
        throw new Error(`Failed to get all reviews: ${error.message}`);
      }
    },

    // Get a single review by ID
    review: async function (parent, { _id }) {
      try {
        return await Review.findById(_id);
      } catch (error) {
        throw new Error(`Failed to get single review: ${error.message}`);
      }
    },
  },

  Mutation: {
    // Add a review and attach it to its tutorial
    addReview: async function (parent, { tutorialId, username, rating, comment }) {
      try {
        const reviewResult = await Review.create({ username, rating, comment });

        await Tutorial.findByIdAndUpdate(
          tutorialId,
          { $push: { reviews: reviewResult._id } },
          { new: true }
        );

        return reviewResult;
      } catch (error) {
        throw new Error(`Failed to add review: ${error.message}`);
      }
    },

    // Update a review's rating and/or comment
    updateReview: async function (parent, { _id, rating, comment }) {
      try {
        // Create an updates object only containing the updated fields
        const updates = {};
        if (rating) {
          updates.rating = rating;
        }
        if (comment) {
          updates.comment = comment;
        }

        return await Review.findByIdAndUpdate(
          _id,
          { $set: updates },
          { new: true }
        );
      } catch (error) {
        throw new Error(`Failed to update review: ${error.message}`);
      }
    },

    // Delete a review
    deleteReview: async function (parent, { _id, tutorialId }) {
      try {
        return await Review.findByIdAndDelete(_id);
      } catch (error) {
        throw new Error(`Failed to delete review: ${error.message}`);
      }
    },
  },
};

module.exports = { reviewTypeDefs, reviewResolvers };
