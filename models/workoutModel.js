const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
	drug_name: {
		type: String,
		required: true
	},
	medical_condition: {
		type: String,
		required: true
	},
	side_effects: {
		type: String,
		required: true
	},
	generic_name: {
		type: String,
		required: true
	},
	drug_classes: {
		type: String,
		required: true
	},
	brand_names: {
		type: String,
		required:true
	},
	medical_condition_description: {
		type: String,
		required:true
	},
	rating: {
		type: Number,
		required:true
	}	
})


module.exports = mongoose.model('medicament', workoutSchema)