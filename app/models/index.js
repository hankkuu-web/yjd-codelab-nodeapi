const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = {sequelize, User};
