var express = require('express');
var router = express.Router();
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var User = require('../controllers/userController');


											// user registration
router.post('/create', function(req, res){
	// console.log(req.body);
	User.create_newUser(req, res);
});

router.post('/login', function(req, res){
	User.login(req, res);
});

module.exports = router;