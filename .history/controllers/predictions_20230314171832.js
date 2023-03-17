const Prediction = require('../models/Prediction')
const { StatusCodes } = require("http-status-codes");

const getAllPredictions = async(req,res) => {
    const predictions = await Prediction.find({})
    res.status(StatusCodes.OK).json({predictions})
 };

const postPrediction = asynciction(req, res) => {
    const prediction= await Prediction.crete
};

const getSinglePrediction = () => {};

const updatePrediction = () => {};

const deletePrediction = () => {};


module.exports = {
  getAllPredictions,
  postPrediction,
  getSinglePrediction,
  updatePrediction,
  deletePrediction,
};