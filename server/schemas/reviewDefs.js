const { gql, AuthenticationError } = require('apollo-server-express');

const { Review, Tutorial, User } = require('../models');

const reviewTypeDefs = gql`
  type Reviewer {
    _id: ID!
    username: String
  }

  type Review {
    _id: ID!
    reviewer: Reviewer
    rating: Int
    comment: String
  }

  type Query {
    reviews: [Review]
    review(_id: ID!): Review
  }

  type Mutation {
    addReview(
      tutorialId: ID!
      reviewer: ID!
      rating: Int
      comment: String
    ): Review

    updateReview(
      _id: ID! 
      rating: Int 
      comment: String
      ): Review

    deleteReview(
      _id: ID!
      ): Review
  }
`;

const reviewResolvers = {
  Query: {
    // Get all reviews
    reviews: async function () {
      try {
        return await Review.find({})
        .populate('reviewer');
      } catch (error) {
        throw new Error(`Failed to get all reviews: ${error.message}`);
      }
    },

    // Get a single review by ID
    review: async function (parent, { _id }) {
      try {
        return await Review.findById(_id)
        .populate('reviewer');
      } catch (error) {
        throw new Error(`Failed to get single review: ${error.message}`);
      }
    },
  },  

  Mutation: {
    // Add a review and attach it to the reviewer and tutorial
    addReview: async function (
      parent,
      { tutorialId, reviewer, rating, comment }
    ) {
      // If user is logged in, add the review to the db
      if (context.user) {
        try {
          const newReview = await Review.create({
            reviewer,
            rating,
            comment,
          });
          await Tutorial.findByIdAndUpdate(
            tutorialId,
            { $push: { reviews: newReview._id } },
            { new: true }
          );
  
          return newReview;

        } catch (error) {
          throw new Error(`Failed to add review: ${error.message}`);
        }
      }
      // If user is not logged in, throw authentication error
      throw new AuthenticationError('You must be logged in to add a review');
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
    deleteReview: async function (parent, { _id }) {
      try {
        return await Review.findByIdAndDelete(_id);
      } catch (error) {
        throw new Error(`Failed to delete review: ${error.message}`);
      }
    },
  },
};

module.exports = { reviewTypeDefs, reviewResolvers };
