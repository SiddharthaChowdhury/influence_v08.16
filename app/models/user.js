
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchemaPrimary = new Schema({

	team_code : {
		type: String
	},
	team_name: {
		type: String
	},
	email: { 
		type: String, 
		required: true, 
		unique: true 
	},
	name: { 
		type: String
	},
	phone: {
		type: Number
	},
	password:{
		type: String
	},
	user_type:{
		type: String,
        enum: ['admin', 'subadmin' ,'writer', 'reader']
	},

	updated_at: Date,
	created_at: { 
		type : Date, 
		default: Date.now 
	}
});


var User = mongoose.model('User', userSchemaPrimary);
module.exports = User;