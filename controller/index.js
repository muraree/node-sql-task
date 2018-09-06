const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userController = require('./user');
const lockController = require('./lock');
const verifyToken = require('../auth/verifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/user/register', userController.register);

router.post('/user/login', userController.login);

router.put('/users/:id', verifyToken, userController.update);

router.delete('/users/:id', verifyToken, userController.deleteUser);

router.get('/users/me', verifyToken, userController.getUser);

router.get('/users', verifyToken, userController.getAllUser);

router.get('/users/:userid', verifyToken, userController.getUserById);

router.post('/locks/create', verifyToken, lockController.create);

router.put('/locks/:lockid', verifyToken, lockController.update);

router.delete('/locks/:lockid', verifyToken, lockController.deleteLock);

router.get('/locks', verifyToken, lockController.getLocks);

module.exports = router;