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
				spaces: spaces,
				joinerror: req.flash('joinerror')[0] || undefined, 
				joinsuccess: req.flash('joinsuccess')[0] || undefined
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
						Team.find({team_name : req.body.team_name, space : ObjectId(space[0]._id)}, function(err, tm){
							if(err) {
								console.log(err)
								req.flash('error', err);
								return res.redirect('/team');
							}
							else{
								if(tm.length > 0){
									req.flash('error', "Error! Sorry you can not create more than one team with same name in same space.");
									return res.redirect('/team');	
								}
								else{
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
												else{
													User.update({_id: ObjectId(req.session.User.uid.toString())},{$push:{teams: team._id}}, function(err){
														if(err){
															req.flash('error', err);
															return res.redirect('/team');
														}
														else{
															Team.findByIdAndUpdate( team._id, {$push: { members: req.session.User.uid}}, function(err){
																if(err){
																	console.log(err);
																	req.flash('joinerror', 'Error! Sorry the joining process has failed. Please try again.');
																	return res.redirect('/team');
																}
																else{
																	req.session.User.teams.push(team._id);
																	req.flash('success', 'Success! Team was saved successfully.');
																	return res.redirect('/team');
																}
															});
														}
													});
												}
											});
										}
									});
								}
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
		if(!req.body.sid){
			res.status(400);
			res.send("Error! Important data missing.");
			return;
		}
		else
		{
			Team.find({space : ObjectId(req.body.sid)}, function(err, teams){
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
	join_team: function(req, res){
		if(!req.body.spacecode || !req.body.teamname){
			req.flash('joinerror', 'Error! Space-code and Team-name both are mandetory!');
			return res.redirect('/team');
		}
		else{
			Space.find({space_code: req.body.spacecode} ,function( err, space ){
				if(err){
					res.status(400);
					req.flash('joinerror', err);
					return res.redirect('/team');
				}
				else{
					if(space.length == 1){
						Team.find({space : ObjectId(space[0]._id), team_name: req.body.teamname }, function(err, teams){
							if(err){
								res.status(400);
								res.send("Error! Failed to get team-informations.");
								return;
							}
							else{
								if(teams.length == 1 ){

									if(teams[0].members.indexOf(req.session.User.uid) == -1 ){
										Team.findByIdAndUpdate( teams[0]._id, {$push: { members: req.session.User.uid}}, function(err){
											if(err){
												console.log(err);
												req.flash('joinerror', 'Error! Sorry the joining process has failed. Please try again.');
												return res.redirect('/team');
											}
											else{

												User.findByIdAndUpdate( ObjectId(req.session.User.uid), {$push: { teams: teams[0]._id}}, function(err){
													if(err){
														console.log(err);
														req.flash('joinerror', 'Error! Sorry the joining process has failed. Please try again.');
														return res.redirect('/team');
													}
													else{
														req.flash('joinsuccess', 'Success! the joining request has been sent. Soon you get response back from the team admin.');
														return res.redirect('/team');
													}
												}); 
											}
										}); 
									}
									else{
										req.flash('joinerror', 'Error! Sorry You already are a member of the team.');
										return res.redirect('/team')
									}
								}
								else{
									req.flash('joinerror', 'Error! Sorry space-code did not match with team-name.');
									return res.redirect('/team')
								}
							}
						});
					}else{
						req.flash('joinerror', 'Error! Space-code was not found!');
						return res.redirect('/team')
					}
				}
			})
		}
	},
}
module.exports = teamController;