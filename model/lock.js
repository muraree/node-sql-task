const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const Lock = sequelize.define('lock', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  macid: { type: Sequelize.STRING, unique: true}, 
  name: {
    type: Sequelize.STRING
  },
});

module.exports = Lock;