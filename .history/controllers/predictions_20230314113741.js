const Prediction =require('../models/Prediction')

const getAllPredictions = async() => {
    const predictions = await Prediction.find()
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