const { 
  Lesson,
  User, 
} = require('../models');

const resolvers = {
  //User resolvers
  Query: {
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.find(params);
    },
  },
};

module.exports = resolvers;
