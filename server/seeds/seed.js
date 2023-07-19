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
}

db.once('open', async () => {
  try {
    // Delete the existing entries
    await Category.deleteMany({});
    await Lesson.deleteMany({});
    await Review.deleteMany({});
    await Tutorial.deleteMany({});
    await User.deleteMany({});

    // Add categories to db and get the resulting IDs
    const categoryResult = await Category.create(categorySeeds);
    const categoryIds = categoryResult.map((category) => category._id);

    // Add lessons to db and get the resulting IDs
    const lessonResult = await Lesson.create(lessonSeeds);
    const lessonIds = lessonResult.map((lesson) => lesson._id);

    // Add reviews to db and get the resulting IDs
    const reviewResult = await Review.create(reviewSeeds);
    const reviewIds = reviewResult.map((review) => review._id);

    // Add users to db and get the resulting IDs
    const userResult = await User.create(userSeeds);
    const userIds = userResult.map((user) => user._id);

    // For each tutorial, randomly set 2 category IDs, 4 lesson IDs, 2 review IDs, & a teacher ID
    tutorialSeeds.map((tutorial) => {
      tutorial.categories = [];
      for (let i = 0; i < 2; i++) {
        tutorial.categories.push(getRandomId(categoryIds));
      }

      tutorial.lessons = [];
      for (let i = 0; i < 4; i++) {
        tutorial.lessons.push(getRandomId(lessonIds));
      }

      tutorial.reviews = [];
      for (let i = 0; i < 2; i++) {
        tutorial.reviews.push(getRandomId(reviewIds));
      }

      tutorial.teacher = getRandomId(userIds);
    });

    // Add tutorials to the db
    const tutorialResult = await Tutorial.create(tutorialSeeds);
    const tutorialIds = tutorialResult.map((tutorial) => tutorial._id);

    // Add enrolled tutorials to users
    const users = await User.find({});

    for (const user of users) {
      const userTutorials = [];
      for (let i = 0; i < 2; i++) {
        userTutorials.push(getRandomId(tutorialIds));
      }

      await User.updateOne(
        { _id: user._id },
        {
          $addToSet: { tutorials: userTutorials },
        },
        {
          new: true,
        }
      );
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('DB seeded!');
  process.exit(0);
});
