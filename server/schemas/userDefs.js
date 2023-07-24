const { gql, AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken, signPasswordResetToken } = require('../utils/auth');

const userTypeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    tutorials: [Tutorial]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(_id: ID!): User
    users: [User]!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User
    forgotPassword(email: String!): Auth

    addTutorialtoUser(tutorialId: ID!): Tutorial

    removeTutorialfromUser(tutorialId: ID!): Tutorial

    updateUserProfile(_id: ID!, username: String, email: String): User
  }
`;

const userResolvers = {
  Query: {
    user: async (parent, { _id }) => {
      try {
        return User.findOne({ _id: _id });
      } catch (err) {
        throw new Error(err);
      }
    },

    users: async () => {
      try {
        return User.find();
      } catch (err) {
        throw new Error(err);
      }
    },

    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('tutorials');
          
          return userData;
        } catch (err) {
          throw new Error(err);
        }
      }

      throw new AuthenticationError('Not logged in');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        let message = 'Server error'

        if (err.message.includes('duplicate')) {
          message = 'Duplicate ' + (err.message.includes('email') ? 'email' : 'username');
        }
        throw new Error(message)
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No email found!');
        }
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect Password!');
        }
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err);
      }
    },

    removeUser: async (parent, args, context) => {
      if (context.user) {
        try {
          return User.findOneAndDelete({ _id: context.user._id });
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    forgotPassword: async (parent, { email }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No email found!');
        }
        const token = signPasswordResetToken(user);
        return { token, user };
      } catch (err) {
        throw new Error(err);
      }
    },

    addTutorialtoUser: async (parent, { _id, tutorialId }, context) => {
      if (context.user) {
        try {
          return User.findOneAndUpdate(
            { _id: _id },
            {
              $addToSet: { tutorials: tutorialId },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeTutorialfromUser: async (parent, { tutorialId }, context) => {
      if (context.user) {
        try {
          return User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { tutorials: tutorialId } },
            { new: true }
          );
        } catch (err) {
          throw new Error(err);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateUserProfile: async (parent, { _id, username, email }, context) => {
      if (context.user) {
        try {
          // Create an updates object only containing the updated fields
          const updates = {};
          if (username) {
            updates.username = username;
          }
          if (email) {
            updates.email = email;
          }

          return await User.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true }
          );
        } catch (err) {
          throw new Error(`Failed to update user: ${error.message}`);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
