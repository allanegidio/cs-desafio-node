var express = require('express');
var userController = require('../controllers/userController');
var accountController = require('../controllers/accountController');
var auth = require('../security/auth.js');

var router = express.Router();

router.post('/users/create', auth.authorize, userController.createUser);
router.get('/users', auth.authorize, userController.getAllUsers);
router.get('/users/:id', auth.authorize, userController.getUserById);
router.put('/users/update/:id', auth.authorize, userController.updateUserById);

router.post('/login', accountController.authenticate);

module.exports = router;
