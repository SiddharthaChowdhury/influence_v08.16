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

			space_code : "",
			space_name: req.body.space_name,
			space_desc: req.body.space_description,
			space_type: 'private'
		});

		
			newSpace.space_code = CodeAvail(getSpaceCode());
			console.log("Space code: "+ newSpace.space_code);
		
		
		newSpace.save(function(err){
			if(err) throw err;
			else{
				console.log("Space successfully created");
			}
		});

		function CodeAvail(code){
			Space.find({space_code: code}, function(err, space){
				if(err) throw err;
				if(space.length == 0){
					return code;
				}
				CodeAvail(getSpaceCode());
			});
		}
		function getSpaceCode(){
			return "SPC-"+ moment().unix() +"-"+ getID(3);
		}

		function getID(loop)
		{
		    var text = "";
		    var possible = "EF012345GM234534WXYZANOPQFGM892345HI34JK0122345345LRSBWXYZ01CDV67TUA89";
		    	possible += "8DK4AS6E3H7X4MV1V0QR0UY69SAF7PKL3G6MVB85Q7QW1DGS2FHG3BM9QERUY8IU7X54656";
		    for( var i=0; i < loop; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
	},

	check_code: function(req, res){
		console.log(req.body);
	},
}

module.exports = spaceController;