var express = require('express');
var router = express.Router();
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var User = require('../controllers/userController');

// --------------------------------------------= Routes accessable ONLY after login };

router.use(function(req, res, next) {
  	if(req.session.isAuthenticated)
  		next();
  	else
  		return res.redirect('/');
});

router.post('/create', function(req, res){		// user registration
	// console.log(req.body);
	User.create_newUser(req, res);
});

router.post('/login', function(req, res){		// user login
	User.login(req, res);
});

// --------------------------------------------=	ENDS


module.exports = router;