// routes_team.js

var express = require('express');
var router = express.Router();
// var User = require('../controllers/userController');
// var Space = require('../controllers/spaceController');
var Team = require('../controllers/teamController');

// ---------------------------------------------= Routes accessable after login };

router.use(function(req, res, next) {
  	if(req.session.isAuthenticated)
  		next();
  	else
  		return res.redirect('/');
});

router.post('/create', function(req, res){
	Team.create_team(req, res);
});

router.post('/join', function(req, res){
	Team.join_team(req, res);
});

router.post('/accept/joining', function(req, res){
	Team.join_team_accepted(req, res);
});


// --------------------------------------------=	ENDS

module.exports = router;