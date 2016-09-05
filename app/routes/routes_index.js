
var express = require('express');
var router = express.Router();
var User = require('../controllers/userController');
var Space = require('../controllers/spaceController');
var Team = require('../controllers/teamController');
////https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton


// GET home page.
router.get('/', function(req, res) {
	var res_obj = {
		title: 'Dockety',
		login_error: req.flash('login-error')[0] || undefined,
		error: req.flash('error')[0] || undefined,
		success: req.flash('success')[0] || undefined,
		forr: req.flash('forr')[0] || undefined
	}
  	res.render('index', res_obj);
});

router.get('/logout', function(req, res){						// logout
	req.session.destroy(function(err) {
     	return res.redirect('/');
  	});
});

router.post('/create', function(req, res){						// user registration
	// console.log(req.body);
	User.create_newUser(req, res);
});

router.post('/login', function(req, res){						// user login
	User.login(req, res);
});

router.get('/FAQ', function(req, res){							// FAQs
	res.render('faq');
});

// --------------------------------------------= Routes accessable after login };

router.use(function(req, res, next) {						// If user LOGGED in 
  	if(req.session.isAuthenticated)
  		next();
  	else
  		return res.redirect('/');
});

router.get('/markdown', function(req, res) {					// Markdown page
  	res.render('private/markdown', { title: 'markdown | Dockety' });
});

router.get('/wysiwyg', function(req, res) {
  	res.render('private/wysiwyg', { title: 'wysiwyg | Dockety' });		// WYSIWYG page
});

router.get('/dashboard', function(req, res) {					// user dashboard
	// console.log(req.session.User);
  	res.render('private/dashboard', { title: 'dashboard | Dockety', user: req.session.User });
});

router.get('/profile', function(req, res) {	
	var res_obj = { 
		title: 'profile | Dockety', 
		user: req.session.User, 
		error: req.flash('error')[0] || undefined, 
		success: req.flash('success')[0] || undefined
	}
  	res.render('private/profile', res_obj);
});

router.get('/space', function(req, res) {						// Space management page
	Space.get_user_space(req, res);
});

router.get('/team', function(req, res){
	Team.manage_team(req, res);
});
// --------------------------------------------=	ENDS

module.exports = router;