
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
	avatar: String,
	notifications : [
		{
			subject: String,
			from: String,
			msg: String,
			response: String,
			notif_date: Date,
			ack_date: Date
		}
	],
	activities : [
		{
			msg: String,
			ref_id: String,
			ref_of:String, 
			date: Date,
		}
	],
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