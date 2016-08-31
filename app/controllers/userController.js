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

	login: function(req, res){
		User.find({ email: req.body.email }, function(err, user) {
 			if (err) throw err;
 			if(user.length == 1){
 				if( bcrypt.compareSync(req.body.password, user[0].password) )
 				{
 					User.update({ _id: user[0]._id }, { $set: { updated_at: new Date }}, function(err, usr){
 						if(err) throw err;
 						else{
 							var u = {
		 						'uid': user[0]._id,
		 						'email': user[0].email,
		 						'user_type': user[0].user_type,
		 						'created_at': user[0].created_at
		 					};

		 					req.session.isAuthenticated = true;
		 					req.session.User = u;
		 					return res.redirect('/dashboard');
 						}
 					});
 				}
 			}
 			else{
 				console.log("user not found");
 			}
 		});
	},
}

module.exports = userController;