var Space    = require('../models/space');
var User     = require('../models/user');
var moment   = require('moment');
var ObjectId = require('mongoose').Types.ObjectId; 

var spaceController = {
	create_newSpace : function(req, res){
		if(!req.body.space_name || !req.body.space_description )
		{
			console.log("SPACE: Mantetory fields missing")
			req.flash('error', 'Error! Space name or description cannot be empty.');
			return res.redirect('/space');
		}
		var newSpace = new Space({
			admin_email: req.session.User.email,
			admin_id: req.session.User.uid,
			space_code : req.body.space_code,
			space_name: req.body.space_name,
			space_desc: req.body.space_description,
			space_type: 'private'
		});

		Space.find({space_code: newSpace.space_code}, function(err, space){
			if(err) throw err;
			if(space.length == 0){
				newSpace.save(function(err, _space){
					if(err) throw err;
					else{
						User.update({_id: ObjectId(req.session.User.uid.toString())},{$push:{spaces: _space._id}}, function(err){
							if(err){
								req.flash('error', err);
								return res.redirect('/team');
							}
							else{
								console.log("Space successfully created");
								req.session.User.spaces.push(_space._id);
								req.flash('success', 'Space successfully created');
		 			  			return res.redirect('/space');
							}
						});	
					}
				});
			}
			else{
				req.flash('error', 'Duplicate CODE found. Please enter a new CODE.');
 			  	return res.redirect('/space');
			}
		});		
	},

	check_code: function(req, res){
		console.log(req.body);
		if(!req.body.code){
			res.status(404);
			res.send("Code not found!");
			return;
		}
		else{
			Space.find({space_code: req.body.code}, function(err, space){
				if(err) throw err;
				if(space.length == 0){
					res.status(200);
					res.send("Not found");
					return;
				}
				else{
					res.status(400);
					res.send("Found");
					return;
				}
			});
		}
	},

	get_user_space: function(req, res){
		Space.find({admin_id: ObjectId(req.session.User.uid)}, function(err, spaces){
			console.log(spaces);
			var res_obj = { 
				title: 'space | Dockety', 
				error : req.flash('error')[0] || undefined, 
				success: req.flash('success')[0] || undefined,
				spaces: spaces
			};
			console.log(res_obj);
		  	res.render('private/space', res_obj);
		});
	},
}

module.exports = spaceController;