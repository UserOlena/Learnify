const { gql } = require('apollo-server-express');

const { Review, Tutorial } = require('../models');

const reviewTypeDefs = gql`
  type Review {
    _id: ID!
    rating: Int
    comment: String
  }

  type Query {
    reviews: [Review]
    review(_id: ID!): Review
  }

  type Mutation {
    addReview(tutorialId: String!, rating: Int, comment: String): Review
    updateReview(_id: ID!, rating: Int, comment: String): Review
    deleteReview(_id: ID!): Review
  }
`;

const reviewResolvers = {
  Query: {
    // Get all reviews
    reviews: async function() {
      return await Review.find({});
    },

    // Get a single review by ID
    review: async function(parent, { _id }) {
      return await Review.findById(_id);
    }
  },
  
  Mutation: {
    // Add a review and attach it to its tutorial
    addReview: async function(parent, { tutorialId, rating, comment }) {
      const reviewResult = await Review.create({ rating, comment});
      
      await Tutorial.findByIdAndUpdate(
        tutorialId,
        { $push: { reviews: reviewResult._id } },
        { new: true }
      );

      return reviewResult;
    },

    // Update a review's rating and/or comment
    updateReview: async function(parent, { _id, rating, comment }) {
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
        { new: true },
      );
    },

    // Delete a review
    deleteReview: async function(parent, { _id, tutorialId }) {
      return await Review.findByIdAndDelete(_id);
    }
  }
};

module.exports = { reviewTypeDefs, reviewResolvers };
