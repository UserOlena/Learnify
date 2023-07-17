const db = require('../config/connection');

const { 
  Category,
  Lesson,
  Review,
  Tutorial,
  User,
} = require('../models');

const categorySeeds = require('./categorySeeds.js');
const lessonSeeds = require('./lessonSeeds.js');
const reviewSeeds = require('./reviewSeeds.js');
const tutorialSeeds = require('./tutorialSeeds.js');
const userSeeds = require('./userSeeds.js');

function getRandomId(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

db.once('open', async () => {
  try {
    // Delete the existing entries
    await Category.deleteMany({});
    await Lesson.deleteMany({});
    await Review.deleteMany({});
    await Tutorial.deleteMany({});
    await User.deleteMany({});

    // Add categories to db and get the resulting IDs
    const categoryResult = await Category.collection.insertMany(categorySeeds);
    const categoryIds = Object.values(categoryResult.insertedIds);

    // Add lessons to db and get the resulting IDs
    const lessonResult = await Lesson.collection.insertMany(lessonSeeds);
    const lessonIds = Object.values(lessonResult.insertedIds);
    
    // Add reviews to db and get the resulting IDs
    const reviewResult = await Review.collection.insertMany(reviewSeeds);
    const reviewIds = Object.values(reviewResult.insertedIds);

    // Add users to db and get the resulting IDs
    const userResult = await User.collection.insertMany(userSeeds);
    const userIds = Object.values(userResult.insertedIds);

    // For each tutorial, randomly set 2 category IDs, 4 lesson IDs, 2 review IDs, & a teacher ID
    tutorialSeeds.map((tutorial) => {
      tutorial.categories = [];
      for (let i = 0; i < 2; i ++) {
        tutorial.categories.push(getRandomId(categoryIds));
      }

      tutorial.lessons = [];
      for (let i = 0; i < 4; i ++) {
        tutorial.lessons.push(getRandomId(lessonIds));
      }

      tutorial.reviews = [];
      for (let i = 0; i < 2; i ++) {
        tutorial.reviews.push(getRandomId(reviewIds));
      }

      tutorial.teacher = getRandomId(userIds);
    });

    // Add tutorials to the db
    await Tutorial.collection.insertMany(tutorialSeeds);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('DB seeded!');
  process.exit(0);
});