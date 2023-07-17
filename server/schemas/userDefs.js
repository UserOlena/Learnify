const { gql, AuthenticationError } = require('apollo-server-express');

const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
        user(userId: ID!): User
        users: [User]!
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(name: String!, email: String!, password: String!): Auth
        removeUser: User
        
        addTutorial(title: String!, description: String!, category: String!, link: String!): Tutorial
        addTeachingTutorial(title: String!, description: String!, category: String!, link: String!): Tutorial

        removeTutorial(tutorialId: ID!): User
        removeTeachingTutorial(tutorialId: ID!): User
    }
`;

const userResolvers = {
    Query: {
        user: async (parent, { userId }) => {
            return User.findOne({_id: userId});
        },

        users: async () => {
            return User.find();
        },

        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('tutorials')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('No User witht this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        removeUser: async (parent, args, context) => {
            if(context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        addTutorial: async (parent, { userId, tutorial }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { tutorials: tutorial},
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },


        removeTutorial: async (parent, { tutorialId }, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { tutorials: tutorialId } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};
  


module.exports = { userTypeDefs, userResolvers };
