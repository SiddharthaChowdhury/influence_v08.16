
var express = require('express');
var router = express.Router();
var User = require('../controllers/userController');
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

router.get('/logout', function(req, res){
	req.session.destroy(function(err) {
		console.log(req.session)
     	return res.redirect('/');
  	});
});

router.post('/create', function(req, res){		// user registration
	// console.log(req.body);
	User.create_newUser(req, res);
});

router.post('/login', function(req, res){		// user login
	User.login(req, res);
});

// --------------------------------------------= Routes accessable after login };

router.use(function(req, res, next) {			// If user LOGGED in 
  	if(req.session.isAuthenticated)
  		next();
  	else
  		return res.redirect('/');
});

router.get('/markdown', function(req, res) {					// Markdown page
  	res.render('markdown', { title: 'markdown | Dockety' });
});

router.get('/wysiwyg', function(req, res) {
  	res.render('wysiwyg', { title: 'wysiwyg | Dockety' });		// WYSIWYG page
});

router.get('/dashboard', function(req, res) {					// user dashboard
  	res.render('dashboard', { title: 'dashboard | Dockety' });
});

router.get('/space', function(req, res) {						// Space management page
	var res_obj = { 
		title: 'space | Dockety', 
		error : req.flash('error')[0] || undefined, 
		success: req.flash('success')[0] || undefined
	};
	console.log(res_obj);
  	res.render('space', res_obj);
});

// --------------------------------------------=	ENDS

module.exports = router;