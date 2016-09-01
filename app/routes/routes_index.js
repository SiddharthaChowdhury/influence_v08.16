
var express = require('express');
var router = express.Router();

////https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
// router.use(function(req, res, next) {
//   // .. some logic here .. like any other middleware
//   next();
// });

// GET home page.
router.get('/', function(req, res) {
	var res_obj = {
		title: 'Dockety',
		error: req.flash('error')[0] || undefined,
		success: req.flash('success')[0] || undefined
	}
	console.log(res_obj);
  	res.render('index', res_obj);
});

// --------------------------------------------= Routes accessable after login };

// router.use(function(req, res, next) {			// If user LOGGED in 
//   	if(req.session.isAuthenticated)
//   		next();
//   	else
//   		return res.redirect('/');
// });

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