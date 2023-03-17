const express = require('express');
const { getAllPredictions } = require('../controllers/predictions');

const router = express.Router()

router.route("/").get(getAllPredictions).post();

router.route('/:id').get().delete().patch()

module.exports=router