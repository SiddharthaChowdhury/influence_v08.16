// teamController.js
var Team  = require('../models/team');
var Space = require('../models/space');
var User  = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
var moment = require('moment'); 

var teamController = {
	manage_team: function(req, res){

		Space.find({admin_id: ObjectId(req.session.User.uid)}, function(err, spaces){
			var res_obj = { 
				title: 'team | Dockety', 
				error : req.flash('error')[0] || undefined, 
				success: req.flash('success')[0] || undefined,
				spaces: spaces,
				joinerror: req.flash('joinerror')[0] || undefined, 
				joinsuccess: req.flash('joinsuccess')[0] || undefined,
				user: req.session.User
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
										// owner_id  : req.session.User.uid,
										space: ObjectId(space[0]._id)
									});
									newTeam.save(function(err, team){
										if(err){
											req.flash('error', 'Error! Failed to save.');
											return res.redirect('/team');
										}
										else{
											newTeam.owner_id.push(ObjectId(req.session.User.uid));
											newTeam.save();
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

									if(teams[0].members.indexOf(req.session.User.uid) == -1){
										if(preRequest_check(teams[0]))
										{
											var notif = {
												subject: 'Joinee',
												data: {
													uid:req.session.User.uid.toString(),
													tid: teams[0]._id.toString(),
												},
												msg: '<font color="#848484">'+req.session.User.email+'</font>'+ " wants to join the team ("+'<font color="#848484">'+teams[0].team_name+'</font>'+"). Please accept if you know the person.",													
												notif_date: new Date,
												for: "admin"
											}
											Team.findByIdAndUpdate( teams[0]._id, {$push: { notifications: notif}}, function(err){			
												if(err){
													console.log(err);
													req.flash('joinerror', 'Error! Sorry the joining process has failed. Please try again.');
													return res.redirect('/team');
												}
												else{
													req.flash('joinsuccess', 'Great! A joining request has been sent to the admin/s. Please wait for him/them to respond.');
													return res.redirect('/team');
												}
											});
										}
										else{
											req.flash('joinerror', 'Hey! Your request is already sent. Please wait for the team admin to respond.');
											return res.redirect('/team')
										}
									}
									else{
										req.flash('joinerror', 'Hey! It seems you are already a member of the team.');
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
		function preRequest_check(team){
			var flag = true;
			for ( var i in team.notifications ){
				if( team.notifications[i].subject == 'Joinee' && team.notifications[i].data.uid == req.session.User.uid ){
					flag = false;
					break;
				}
			}
			return flag
		}
	},

	join_team_accepted: function(req, res){
		if(!req.body.uid || !req.body.tid){
			res.status(400);
			return res.send("Error! Internal error occured!.");
		}
		else{

			Team.findByIdAndUpdate( ObjectId(req.body.tid), {$push: { members: req.body.uid}}, function(err){
				if(err){
					res.status(400);
					return res.send('Error! Sorry the joining process has failed. Please try again.');
				}
				else{
					User.findByIdAndUpdate( ObjectId(req.body.uid), {$push: { teams: req.body.tid}}, function(err){
						if(err){
							res.status(400);
							return res.send('Error! Sorry the joining process has failed. Please try again.');
						}
						else{
							res.status(200);
							return res.send('Success! Member joining accepted.');
						}
					}); 
				}
			});
		}
	},

}
module.exports = teamController;