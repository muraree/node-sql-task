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

router.put('/user/:id', verifyToken, userController.update);

router.delete('/user/:id', verifyToken, userController.deleteUser);

router.get('/user/me', verifyToken, userController.getUser);

router.get('/user', verifyToken, userController.getAllUser);

router.get('/user/:userid', verifyToken, userController.getUserById);

router.post('/lock/create', verifyToken, lockController.create);

router.put('/lock/:lockid', verifyToken, lockController.update);

router.delete('/lock/:lockid', verifyToken, lockController.deleteLock);

router.get('/lock', verifyToken, lockController.getLock);

module.exports = router;