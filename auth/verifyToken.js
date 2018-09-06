const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {

  const token = req.headers["x-access-token"];
  if(!token) res.send({auth: false, message: "no token provided"});

  jwt.verify(token, config.secret, function(err, decoded) {
    if(err) res.send({auth: false, message: "token authentication failed"});

    req.userId = decoded.id;
    if(req.params && req.params.id && decoded.id !== parseInt(req.params.id)) return res.send({ auth: false, message: "user not found"});
    next();
  });
}

module.exports = verifyToken;