
// referance http://stackoverflow.com/questions/8737082/mongoose-schema-within-schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spaceSchemaPrimary = new Schema({

	space_code : {
		type: String
	},
	space_name: {
		type: String
	},
	space_desc: {
		type: String
	},

	space_type:{
		type: String,
        enum: ['public', 'private']
	},
	teams: [{type: Schema.ObjectId, ref: 'Team'}], //the name of the model is "Team"
	updated_at: Date,
	created_at: { 
		type : Date, 
		default: Date.now 
	}
});

var space = mongoose.model('Space', spaceSchemaPrimary);
module.exports = space;