// teamController.js
var Team  = require('../models/team');
var Space = require('../models/space');
var User  = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId; 

var teamController = {
	manage_team: function(req, res){

		Space.find({admin_id: ObjectId(req.session.User.uid)}, function(err, spaces){
			var res_obj = { 
				title: 'team | Dockety', 
				error : req.flash('error')[0] || undefined, 
				success: req.flash('success')[0] || undefined,
				spaces: spaces
			};
			// console.log(res_obj);
		  	res.render('private/team', res_obj);
		});
	},
	create_team: function(req, res){
		if(!req.body.team_name || !req.body.team_desc || !req.body.selected_space)
		{
			console.log("TEAM: Mantetory fields missing")
			req.flash('error', 'Error! All form elements are mandetory');
			return res.redirect('/team');
		}
		else{
			Space.find({space_code: req.body.selected_space}, function(err, space){
				if(err) {
					console.log(err)
					req.flash('error', err);
					return res.redirect('/team');
				}
				else{
					if(space.length > 0){
						var newTeam = new Team({
							team_name : req.body.team_name,
							team_desc : req.body.team_desc,
							owner_id  : req.session.User.uid,
							owner_email  : req.session.User.email,
							space: ObjectId(space[0]._id)
						});
						newTeam.save(function(err, team){
							if(err){
								req.flash('error', 'Error! Failed to save.');
								return res.redirect('/team');
							}
							else{
								Space.update({space_code: req.body.selected_space},{$push:{teams: team._id}}, function(err){
									if(err){
										req.flash('error', err);
										return res.redirect('/team');
									}
								});
								User.update({_id: ObjectId(req.session.User.uid.toString())},{$push:{teams: team._id}}, function(err){
									if(err){
										req.flash('error', err);
										return res.redirect('/team');
									}
								});

								req.session.User.teams.push(team._id);
								req.flash('success', 'Success! Team was saved successfully.');
								return res.redirect('/team')
							}
						});
					}
					else{
						req.flash('error', "Error! Space not found.");
						return res.redirect('/team');
					}
				}
			});
		}
	},
	fetch_async: function(req, res){
		console.log(req.body)
		if(!req.body.uid){
			res.status(400);
			res.send("Error! Important data missing.");
			return;
		}
		else
		{
			Team.find({owner_id : req.session.User.uid}, function(err, teams){
				if(err){
					res.status(400);
					res.send("Error! Failed to get team informations.");
					return;
				}
				else{
					res.status(200);
					res.send(teams);
					return;
				}
			})
		}
	},
}
module.exports = teamController;