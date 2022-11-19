const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');


const seedPosts = require('./posts')
const seedComments = require('./comments');
const seedUsers = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedDatabase();
