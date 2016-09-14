var express = require('express');
var router = express.Router();
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var User = require('../controllers/userController');
var Space = require('../controllers/spaceController');
var Team = require('../controllers/teamController');
// --------------------------------------------= Routes accessable ONLY after login };

router.post('/profile/save', function(req, res){	// Code checking
	User.update_profile(req, res);
});

router.post('/fetch/async/spaces', function(req, res){	// Get user spaces
	Space.fetch_async(req, res);
});

router.post('/fetch/async/teams', function(req, res){	// Get user teams
	Team.fetch_async(req, res);
});

// --------------------------------------------=	ENDS
module.exports = router;