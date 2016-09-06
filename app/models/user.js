
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchemaPrimary = new Schema({

	description : {
		type: String
	},
	display_name: {
		type: String
	},
	email: { 
		type: String, 
		required: true, 
		unique: true 
	},
	city: { 
		type: String
	},
	country:{
		type: String
	},
	lat: { 
		type: String
	},
	lng:{
		type: String
	},
	formatted_address:{
		type: String
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
	teams: [{type: Schema.ObjectId, ref: 'Team'}], 		//the name of the model is "Team"
	spaces: [{type: Schema.ObjectId, ref: 'Space'}], 	//the name of the model is "Team"
	updated_at: Date,
	created_at: { 
		type : Date, 
		default: Date.now 
	}
});


var User = mongoose.model('User', userSchemaPrimary);
module.exports = User;