
// referance http://stackoverflow.com/questions/8737082/mongoose-schema-within-schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchemaPrimary = new Schema({

	team_name: {
		type: String
	},
	team_desc: {
		type: String
	},
	owner_id: [{type: Schema.ObjectId, ref: 'User'}],
	members: [{type: Schema.ObjectId, ref: 'User'}], 
	space: {type: Schema.ObjectId, ref: 'Space'},
	updated_at: Date,
	created_at: { 
		type : Date, 
		default: Date.now 
	}

});

var team = mongoose.model('Team', teamSchemaPrimary);
module.exports = team;