const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

const User = sequelize.define('user', {
  name: Sequelize.STRING
});

module.exports = {sequelize, User};
