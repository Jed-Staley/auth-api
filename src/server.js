'use strict';


const express = require('express');
const cors = require('cors');
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./auth/auth-routes.js');
const apiRoutes = require('./routes/api-routes.js');
const rolesCapabilities = require('./routes/roles-capabilities-routes.js');
const v2 = require('./routes/v2.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(authRoutes);
app.use('/api/v2,', v2);
app.use('/api/api-routes', apiRoutes);
app.use('/api/roles', rolesCapabilities);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) {
      throw new Error('Missing Port');
    }
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
