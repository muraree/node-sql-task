const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/user');

const register = async (req, res) => {
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
    const token = jwt.sign({id: user._id}, config.secret, {expiresIn: 86400});
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
      console.log(user);
      const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
      if(!passwordIsValid){ 
        res.send({auth: false, message: "Username or password incorrect"});
        return
      }
      const token = jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400});
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

const update = async () => {
  try{
    if(!req.userId) res.send({auth: false, message: "token verified but id not found."});

    const user = await User.findById({ _id: req.userId }, { password: 0 });
    if(!user) res.send({auth: false, message: "No user found with this id"});
    if(user.role === "admin"){
      await User.findByIdAndUpdate({_id:req.params.id},{$set:{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      }});
      res.send({success:true});
    }
    else{
      res.send({auth:false,success:false});
    }
  }
  catch(err){
    console.log(err);
  }
}

module.exports = { register, login };