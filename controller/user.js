const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/user');
const Op = Sequelize.Op;

const register = async (req, res) => {

  if(!req.body.username) return res.send({ auth:false, message:"username is required."}); 
  if(!req.body.password) return res.send({ auth:false, message:"password is required."}); 

  const hashedPass = bcrypt.hashSync(req.body.password,8);
  
  try{
    await User.sync();
    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPass,
      birthDate: req.body.birthDate,
    })
    const token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});
    res.send({ auth: true, token });
  }
  catch(err){
    console.log(err);
  }
}

const login = async (req, res) => {

  try{
    if((req.body.username) && (req.body.password)){

      const user = await User.find({
        where: { username: req.body.username }
      });
      if(!user){ 
        res.send({auth: false, message: "no user was found."});
        return
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
      if(!passwordIsValid){ 
        res.send({auth: false, message: "Username or password incorrect"});
        return
      }
      const token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
      res.send({auth: true, token , user});
    }
    else{
      res.send({auth: false, message: "please provide the credentials."});
    }
  }
  catch(err){
    console.log(err);
  }
}

const update = async (req, res, next) => {

  try{
    if(!req.params.id) res.send({auth: false, message: "Please provide id for update."});

    await User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
    },
      {
        where: { id: req.userId }
      });

    res.send({ auth: true, message: "user updated"});
  }
  catch(err){
    console.log(err);
  }
}

const deleteUser = async (req, res, next) => {

  try{
    if(!req.params.id) res.send({auth: false, message: "Please provide id for update."});

    await User.destroy(
      {
        where: { id: req.userId }
      });

    res.send({ auth: true, message: "user deleted"});
  }
  catch(err){
    console.log(err);
  }
}

const getUser = async (req, res, next) => {

  try{
    const user = await User.find(
      {
        where: { id: req.userId }
      });

    res.send({ auth: true, user });
  }
  catch(err){
    console.log(err);
  }
}

const getAllUser = async (req, res, next) => {

  try{
    let users;
    if(req.query.username){
      users = await User.find({
        where: {  
            username: req.query.username
          }
      });
    }
    else{
      users = await User.findAll({
        attributes: ['id', 'username', 'firstName', 'lastName', 'createdAt', 'updatedAt']
      },
        {
        where:{  
          id:{
            [Op.ne]: req.userId
          } 
        }
      });
    }

    res.send({ auth: true, users });
  }
  catch(err){
    console.log(err);
  }
}

const getUserById = async (req, res, next) => {

  try{
    const user = await User.find({
      where: {  
          id: parseInt(req.params.userid)
        }
    });

    res.send({ auth: true, user });
  }
  catch(err){
    console.log(err);
  }
}

module.exports = { register, login, update, deleteUser, getUser, getAllUser, getUserById };