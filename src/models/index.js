//src/models/index.js

// This file talks to the Database

'use strict';

const { Sequelize, DataTypes } = require('sequelize');

// Import Models
const clothesModel = require('./clothes.js');
const foodModel = require('./food.js');
const userModel = require('./users.js');
const Collection = require('./data-collection.js');

// Environment and Database Configuration
const environment = process.env.NODE_ENV;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const testOrProduction = environment === 'test' || environment === 'production';

// Initialize Sequelize
const sequelize = new Sequelize(DATABASE_URL, testOrProduction ? { logging: false } : {});

// Initialize Models
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

// Export the database connection and models
module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users,
};
