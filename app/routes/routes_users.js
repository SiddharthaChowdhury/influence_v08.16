var express = require('express');
var router = express.Router();
// https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

var User = require('../controllers/userController');

// --------------------------------------------= Routes accessable ONLY after login };

// router.use(function(req, res, next) {
//   	if(req.session.isAuthenticated)
//   		next();
//   	else
//   		return res.redirect('/');
// });


// --------------------------------------------=	ENDS


module.exports = router;