const medicament = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workout
const getMedocs = async (req, res) => {
	const workouts = await medicament.find({})
	res.status(200).json(workouts)
}


//get a single workout
const getMedoc = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce medicament nexiste pas'})
	}

	const workout = await medicament.findById(id)
	if (!workout) {
		return res.status(400).json({error: 'Ce medicament nexiste passs'})
	}

	res.status(200).json(workout)
}



//create a single workout
const createMedoc = async (req, res) => {
	const {drug_name, medical_condition, side_effects, generic_name, drug_classes, brand_names, medical_condition_description, rating} = req.body

	let emptyFields = []

	if (!drug_name) {
		emptyFields.push('drug_name')
	}
	if (!medical_condition) {
		emptyFields.push('medical_condition')
	}
	if (!side_effects) {
		emptyFields.push('side_effects')
	}
	if (!generic_name) {
		emptyFields.push('generic_name')
	}
	if (!drug_classes) {
		emptyFields.push('drug_classes')
	}
	if (!brand_names) {
		emptyFields.push('brand_names')
	}
	if (!medical_condition_description) {
		emptyFields.push('medical_condition_description')
	}
	if (!rating) {
		emptyFields.push('rating')
	}

	if (emptyFields.length > 0) {
		return res.status(400).json({error: 'Veuillez remplir tous les champs', emptyFields })
	}


	//add doc to db
	try {
		const workout = await medicament.create({drug_name, medical_condition, side_effects, generic_name, drug_classes, brand_names, medical_condition_description, rating})
		res.status(200).json(workout)
	} catch (error) {
		res.status(400).json({error: error.message})
	}
}



//delete
const deleteMedoc = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce medicament nexiste pas'})
	}

	const workout = await medicament.findOneAndDelete({_id: id})

	if (!workout) {
		return res.status(400).json({error: 'Ce medicament nexiste pas'})
	}

	res.status(200).json({msg: 'Medicament supprimé'})
}


//update
const updateMedoc = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({error: 'Ce medicament nexiste pas'})
	}

	const workout = await medicament.findOneAndUpdate({_id: id}, {
		...req.body
	})

	if (!workout) {
		return res.status(400).json({error: 'Ce medicament nexiste pas'})
	}

	res.status(200).json({msg: 'Médicament modifié'})
}



//get tous les medicaments dont la condition médical est fournie en paramètre
const medCond = async (req, res) => {
	const condition = req.params.medical_condition

	medicament.find({medical_condition : condition}, {drug_name:1, medical_condition:1, _id:0})
		.then(data  => {
			if (!data)
				res.status(404).json({error : 'not found'})
			else
				res.send(data)
		})
		.catch (err => {
			res
				.status(500).send({mesg: 'error retri'})
		})
}


//get tous les medicaments dont le rating est inférieur ou égale à un nombre fournit en parametre
const ratingMedoc = async (req, res) => {
	const noteinf = req.params.rating

	medicament.find({rating : {$lte:noteinf}}, {drug_name:1, medical_condition:1, rating:1, _id:0})
		.then(data  => {
			if (!data)
				res.status(404).json({error : 'not found'})
			else
				res.send(data)
		})
		.catch (err => {
			res
				.status(500).send({mesg: 'error retri'})
		})
}




module.exports= {
	getMedocs,
	getMedoc,
	createMedoc,
	deleteMedoc,
	updateMedoc,
	medCond,
	ratingMedoc
}