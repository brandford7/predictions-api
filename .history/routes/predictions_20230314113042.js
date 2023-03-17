const express = require('express');
const { getAllPredictions, postPrediction, deletePrediction } = require('../controllers/predictions');

const router = express.Router()

router.route("/").get(getAllPredictions).post(postPrediction);

router.route('/:id').get(getsin).delete(deletePrediction).patch()

module.exports=router