// teamController.js
var Team = require('../models/team');
var Space = require('../models/space');
var ObjectId = require('mongoose').Types.ObjectId; 

var teamController = {
	manage_team: function(req, res){

		Space.find({admin_id: ObjectId(req.session.User.uid)}, function(err, spaces){
			var res_obj = { 
				title: 'team | Dockety', 
				spaces: spaces
			};
			console.log(res_obj);
		  	res.render('private/team', res_obj);
		});
	},
}
module.exports = teamController;