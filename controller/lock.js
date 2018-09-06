const uniqueId = require('../macidgenerator');
const Lock = require('../model/lock');

const create = async (req, res, next) => {

  if(!req.body.name) return res.send({ auth: true, message: "name is required." });
  if(!req.body.userid) return res.send({ auth: true, message: "user id is required." });

  try{
    await Lock.sync();
    const lock = await Lock.create({
      macid: uniqueId(),
      name: req.body.name,
      user: req.body.userid,
    })
    res.send({ auth: true, lock });
  }
  catch(err){
    console.log(err);
  }
}

const update = async (req, res, next) => {

  try{
    if(!req.params.lockid) return res.send({auth: false, message: "Please provide lockid for update."});

    await Lock.update({
      name: req.body.name,
    },
      {
        where: { id: req.params.lockid }
      });

    res.send({ auth: true, message: "lock updated"});
  }
  catch(err){
    console.log(err);
  }
}

const deleteLock = async (req, res, next) => {

  try{
    if(!req.params.lockid) return res.send({auth: false, message: "Please provide lockid for update."});

    await Lock.destroy(
      {
        where: { id: req.params.lockid }
      });

    res.send({ auth: true, message: "lock deleted"});
  }
  catch(err){
    console.log(err);
  }
}

const getLock = async (req, res, next) => {
  
  try{
    let lock;
    if(req.query.id){
      lock = await Lock.find({ where: { id: parseInt(req.query.id) }});
    }
    else if(req.query.macid){
      lock = await Lock.find({ where: { macid: req.query.macid }});
    }
    else{
      lock = await Lock.findAll({ where: { user: parseInt(req.userId) }});
    }
    res.send({ auth: true, lock });
  }
  catch(err){
    console.log(err);
  }
}

module.exports = { create, update, deleteLock, getLock };