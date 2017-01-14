const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const models = require('./models');
const swagger = require('./config/swagger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test')
  app.use(logger('dev'));

// Routes
app.use('/users', require('./api/user'));

swagger.setup(app);

module.exports = app;
