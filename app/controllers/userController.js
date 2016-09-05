var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var ObjectId = require('mongoose').Types.ObjectId; 

var userController = {
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
		 					if( typeof user[0].name != 'undefined' ) u["name"] = user[0].name;
		 					if( typeof user[0].display_name != 'undefined' ) u["display_name"] = user[0].display_name;
		 					if( typeof user[0].description != 'undefined' ) u["description"] = user[0].description;
		 					if( typeof user[0].phone != 'undefined' ) u["phone"] = user[0].phone;
		 					if( typeof user[0].lat != 'undefined' ) u["lat"] = user[0].lat;
		 					if( typeof user[0].lng != 'undefined' ) u["lng"] = user[0].lng;
		 					if( typeof user[0].city != 'undefined' ) u["city"] = user[0].city;
		 					if( typeof user[0].country != 'undefined' ) u["country"] = user[0].country;
		 					if( typeof user[0].formatted_address != 'undefined' ) u["formatted_address"] = user[0].formatted_address;
		 					req.session.isAuthenticated = true;
		 					req.session.User = u;
		 					return res.redirect('/dashboard');
 						}
 					});
 				}
 				else{
 					req.flash('login-error', 'Password was wrong!');
 			  		return res.redirect('/');
 				}
 			}
 			else{
 				req.flash('login-error', 'Login credentials mismatch!');
 			  	return res.redirect('/');
 			}
 		});
	},

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
				// req.flash('forr', 'signup');
			  	req.flash('error', 'User already exists.');
 			  	return res.redirect('/');
			}
			else
			{
				newUser.save(function(err) {
					if (err) throw err;
					// req.flash('forr', 'signup');
					req.flash('success', 'Registration was successfully completed. Please sign in.');
 			  		return res.redirect('/');
				});
			}
		});
	},

	save_account: function(req, res){
		var u = { 
			name: req.body.name,
			display_name: req.body.d_name,
			description: req.body.description,
			phone: req.body.phone,
			lat: req.body.lat,
			lng: req.body.lng,
			city: req.body.city,
			country: req.body.country,
			formatted_address: req.body.address
		}
		User.update({ _id: ObjectId(req.session.User.uid.toString()) }, { $set: u}, function(err, usr){
			if(err) {
				req.flash('error', err);
				return res.redirect('/profile');
			}
			else{
				u.email = req.session.User.email;
				u._id = req.session.User._id;
				u.user_type = req.session.User.user_type;
				u.created_at = req.session.User.created_at;
				
				req.session.User = u;
				req.flash('success', 'Profile details saved successfully!');
				return res.redirect('/profile');
			}
		});
	},
}

module.exports = userController;