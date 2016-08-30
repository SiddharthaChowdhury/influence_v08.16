var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

var userController = {
	create_newUser : function(req, res){
		if(!req.body.email || !req.body.password )
		{
			req.flash('error', 'Error! Email or password cannot be empty.');
			return res.redirect('/');
		}
		var newUser = new User({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password),
			user_type: 'admin'
		});

		User.find({ email: newUser.email }, function(err, user) {
			if (err) throw err;
			if(user.length > 0){
			  	req.flash('error', 'User already exists.');
 			  	return res.redirect('/');
			}
			else
			{
				newUser.save(function(err) {
					if (err) throw err;
					console.log('User saved successfully!');
					req.flash('success', 'Registration was successfully completed. Please sign in.');
 			  		return res.redirect('/');
				});
			}
		});
	},
}

module.exports = userController;