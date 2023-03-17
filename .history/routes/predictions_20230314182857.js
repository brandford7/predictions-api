const express = require('express');
const { getAllPredictions, postPrediction, deletePrediction, getPrediction, updatePrediction } = require('../controllers/predictions');

const router = express.Router()

router.route("/").get(getAllPredictions).post(postPrediction);

router.route('/:id').get(getPrediction).delete(deletePrediction).patch(updatePrediction)

module.exports=router