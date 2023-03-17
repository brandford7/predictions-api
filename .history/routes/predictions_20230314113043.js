const express = require('express');
const { getAllPredictions, postPrediction, deletePrediction, getSinglePrediction } = require('../controllers/predictions');

const router = express.Router()

router.route("/").get(getAllPredictions).post(postPrediction);

router.route('/:id').get(getSinglePrediction).delete(deletePrediction).patch()

module.exports=router