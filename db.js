const Sequelize = require("sequelize");
const createDb = require('./connection');
let sequelize;

async function initializeDb () {
  try{
    sequelize = new Sequelize('kw0mac4p5hrm2x9j', 'jlrdbclouioqvfom', 'jlrdbclouioqvfom', {
      host: 'lyl3nln24eqcxxot.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306,
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
