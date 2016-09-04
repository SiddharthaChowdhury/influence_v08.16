var Space = require('../models/space');
var moment = require('moment');

var spaceController = {
	create_newSpace : function(req, res){
		if(!req.body.space_name || !req.body.space_description )
		{
			console.log("SPACE: Mantetory fields missing")
			req.flash('error', 'Error! Space name or description cannot be empty.');
			return res.redirect('/space');
		}
		var newSpace = new Space({

			space_code : req.body.space_code,
			space_name: req.body.space_name,
			space_desc: req.body.space_description,
			space_type: 'private'
		});

		Space.find({space_code: newSpace.space_code}, function(err, space){
			if(err) throw err;
			if(space.length == 0){
				newSpace.save(function(err){
					if(err) throw err;
					else{
						console.log("Space successfully created");
						req.flash('success', 'Space successfully created');
 			  			return res.redirect('/space');
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
					res.status(500);
					res.send("found");
					return;
				}
			});
		}
	},
}

module.exports = spaceController;