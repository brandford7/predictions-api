const Prediction = require("../models/Prediction");
const { StatusCodes } = require("http-status-codes");

const getAllPredictions = async (req, res) => {
  const predictions = await Prediction.find({});
  res.status(StatusCodes.OK).json({ predictions });
};

// posting a prediction
const postPrediction = async (req, res) => {
  const prediction = await Prediction.create(req.body);
  res.status(StatusCodes.CREATED).json({ prediction });
};

// fetching a single prediction by id
const getPrediction = async (req, res) => {
  const {
    params: { id: predictionId },
  } = req;

  const prediction = await Prediction.findOne({ _id: predictionId });
  if (!prediction) {
    res.status(404).json(`no prediction found with id :${predictionId}`);
  }
  res.status(StatusCodes.OK).json({ count: prediction.length,prediction });
};

//updating a prediction
const updatePrediction = async (req, res) => {
  const {
    body: { country, competition, homeTeam, awayTeam, bet },
    params: { id: predictionId },
  } = req;

  const prediction = await Prediction.findByIdAndUpdate(
    { _id: predictionId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ prediction });
};

//deleting a prediction
const deletePrediction = async (req, res) => {
  
    const { prams: { id: predictionId } } = req
  const prediction = await Prediction.findByIdAndRemove({ _id: predictionId });
};

module.exports = {
  getAllPredictions,
  postPrediction,
  getPrediction,
  updatePrediction,
  deletePrediction,
};
