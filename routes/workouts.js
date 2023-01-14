const express = require('express')
const {createMedoc, getMedocs, getMedoc, deleteMedoc, updateMedoc, medCond, ratingMedoc} = require('../controllers/workoutController')

const router = express.Router()

//Get tous les médicaments
router.get('/', getMedocs)

//Get un médicament par son id
router.get('/:id', getMedoc)

//Post un médicament 
router.post('/', createMedoc)

//delete un médicament par son id
router.delete('/:id', deleteMedoc)

//Update un médicament par son id
router.patch('/:id', updateMedoc)

//get tous les medicaments dont le condition médical est maux de tete
router.get('/condition/:medical_condition', medCond)

//get tous les medicaments dont le rating est inférieur ou égale à un nombre fournit en parametre
router.get('/noteinf/:rating', ratingMedoc) 

module.exports = router


