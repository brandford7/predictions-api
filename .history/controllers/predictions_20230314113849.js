const Prediction =require('../models/Prediction')

const getAllPredictions = async(req,res) => {
    const predictions = await Prediction.find({})
    res.status().json
 };

const postPrediction = () => {};

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