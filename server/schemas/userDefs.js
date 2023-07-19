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
		user(_id: ID!): User
		users: [User]!
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		removeUser: User

		addTutorialtoUser(tutorialId: ID!): Tutorial

		removeTutorialfromUser(tutorialId: ID!): Tutorial
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
				} catch (err) {
					throw new Error(err);
				}
				return userData;
			}

			throw new AuthenticationError('Not logged in');
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			try {
				const user = await User.create({ username, email, password });
				const token = signToken(user);
			} catch (err) {
				throw new Error(err);
			}

			return { token, user };
		},

		login: async (parent, { email, password }) => {
			try {
				const user = await User.findOne({ email });
			} catch (err) {
				throw new Error(err);
			}

			if (!user) {
				throw new AuthenticationError('No User with this email found!');
			}

			try {
				const correctPw = await user.isCorrectPassword(password);
			} catch (err) {
				throw new Error(err);
			}

			if (!correctPw) {
				throw new AuthenticationError('Incorrect Password!');
			}

			try {
				const token = signToken(user);
			} catch (err) {
				throw new Error(err);
			}

			return { token, user };
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
	},
};

module.exports = { userTypeDefs, userResolvers };
