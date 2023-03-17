const express = require('express');
const { getAllPredictions, postPrediction } = require('../controllers/predictions');

const router = express.Router()

router.route("/").get(getAllPredictions).post(postPrediction);

router.route('/:id').get().delete().patch()

module.exports=router