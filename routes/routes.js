var express = require('express');
var userController = require('../controllers/userController');
var auth = require('../security/auth.js');

var router = express.Router();

router.post('/singup', userController.singupCreateUser);
router.post('/singin', userController.getUserAndLogin);
router.get('/seachUser/:id', auth.authorize, userController.seachUser);

module.exports = router;
