const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const models = require('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test')
  app.use(logger('dev'));

app.use('/users', require('./api/user'));

app.get('/', (req, res) => res.send('Hello World!\n'));

module.exports = app;
