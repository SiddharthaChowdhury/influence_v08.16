var express = require('express');
var router = express.Router();

var Space = require('../controllers/spaceController');

// ---------------------------------------------= Routes accessable after login };

router.use(function(req, res, next) {
  	if(req.session.isAuthenticated)
  		next();
  	else
  		return res.redirect('/');
});
											
router.post('/create', function(req, res){		// Space creation
	// console.log(req.body);
	Space.create_newSpace(req, res);
});

router.post('/code/check', function(req, res){	// Code checking
	Space.check_code(req, res);
});

// --------------------------------------------=	ENDS


module.exports = router;