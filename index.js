'use strict';

require('dotenv').config();
const { db } = require('./src/models/index.js');
const server = require('./src/server.js');
const PORT = process.env.PORT || 3000;

// Synchronize the database and start the server
db.sync()
  .then(() => {
    server.start(PORT);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
  });