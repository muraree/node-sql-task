const mysql = require('mysql');

const createDb = () => {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
  });
  
  db.connect(async function(err) {
    if (err) throw err;
    console.log("Connected!");
    try{
      await db.query("CREATE DATABASE lattis");
    }
    catch(err){
      console.log(err);
    }
  });
}

module.exports = createDb;