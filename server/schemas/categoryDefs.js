const { gql } = require('apollo-server-express');

const { Category, Tutorial } = require('../models');

const categoryTypeDefs = gql`
  type Category {
    _id: ID!
    category: String
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
  }

  type Mutation {
    addCategory(category: String!): Category
    updateCategory(_id: ID!, category: String!): Category
    deleteCategory(_id: ID!): Category
  }
`;

const categoryResolvers = {
  Query: {
    //GET all categories
    categories: async function () {
      try {
        return await Category.find({});
      } catch (error) {
        throw new Error(`Failed to retrieve categories: ${error.message}`);
      }
    },

    //GET a single category by ID
    category: async function (parent, { _id }) {
      try {
        return await Category.findById(_id);
      } catch (error) {
        throw new Error(`Failed to retrieve category: ${error.message}`);
      }
    },
  },
  Mutation: {
    // ADD a new category
    addCategory: async function (parent, { category }) {
      try {
        return await Category.create({ category });
      } catch (error) {
        throw new Error(`Failed to add category: ${error.message}`);
      }
    },
    //UPDATE a category and its associated tutuorials
    updateCategory: async function (parent, { _id, category }) {
      try {
        // Find the category by ID
        const updatedCategory = await Category.findByIdAndUpdate(
          _id,
          { category },
          { new: true }
        );

        if (!updatedCategory) {
          throw new Error('Category not found');
        }

        // Find tutorials associated with updated category
        const tutorials = await Tutorial.find({
          categories: updatedCategory._id,
        });

        // Update the category in each associated tutorial
        await Promise.all(
          tutorials.map((tutorial) => {
            tutorial.categories.forEach((categoryId, index) => {
              if (categoryId.equals(updatedCategory._id)) {
                tutorial.categories[index] = updatedCategory._id;
              }
            });
            return tutorial.save();
          })
        );
        return updatedCategory;
      } catch (error) {
        throw new Error(`Failed to update category: ${error.message}`);
      }
    },

    //DELETE a category and remove it from any associated tutorials
    deleteCategory: async function (parent, { _id }) {
      try {
        const categoryToDelete = await Category.findById(_id);

        if (!categoryToDelete) {
          throw new Error('Category not found');
        }

        //find tutorials associated with the category
        const tutorials = await Tutorial.find({
          categories: categoryToDelete._id,
        });

        //remove the category from each associated tutorial
        await Promise.all(
          tutorials.map((tutorial) => {
            tutorial.categories.pull(categoryToDelete._id);
            return tutorial.save();
          })
        );
        return await Category.findByIdAndDelete(_id);
      } catch (error) {
        throw new Error(`Failed to delete category: ${error.message}`);
      }
    },
  },
};

module.exports = { categoryTypeDefs, categoryResolvers };
