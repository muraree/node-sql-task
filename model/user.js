const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  birthDate: {
    type: Sequelize.DATE
  }
});

module.exports = User;