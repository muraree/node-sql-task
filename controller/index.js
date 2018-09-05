const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const userController = require('./user');
const lockController = require('./lock');
const verifyToken = require('../auth/verifyToken');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;