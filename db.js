const Sequelize = require("sequelize");
const createDb = require('./connection');
let sequelize;

async function initializeDb () {
  try{
    sequelize = new Sequelize('lattis', 'root', 'root', {
      host: 'localhost',
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    });
    await sequelize.authenticate();
  }
  catch(err){
    if(err.original.errno == 1049){
      createDb();
    }
  }
}

initializeDb();
module.exports = sequelize;
