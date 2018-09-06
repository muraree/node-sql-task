const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('./user');
const lockController = require('./lock');
const verifyToken = require('../auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', userController.register);

router.post('/login', userController.login);

router.put('/:id', verifyToken, userController.update);

router.delete('/:id', verifyToken, userController.deleteUser);

router.get('/me', verifyToken, userController.getUser);

module.exports = router;