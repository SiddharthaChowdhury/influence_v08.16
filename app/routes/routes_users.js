var express = require('express');
var router = express.Router();
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var User = require('../controllers/userController');

// --------------------------------------------= Routes accessable ONLY after login };

router.post('/profile/save', function(req, res){	// Code checking
	User.save_account(req, res);
});


// --------------------------------------------=	ENDS


module.exports = router;