const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const models = require('./models');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/users', require('./api/user'));

app.get('/', (req, res) => res.send('Hello World!\n'));

models.sequelize.sync({force: true}).then(_=> {
  app.listen(3000, () => console.log(`Run at http://localhost:3000`));
})

module.exports = app;
