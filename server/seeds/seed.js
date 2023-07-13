const db = require('../config/connection');
const { 
  User,
} = require('../models');

const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('DB seeded!');
  process.exit(0);
});