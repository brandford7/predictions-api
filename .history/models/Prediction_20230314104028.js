const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({});

module.exports = mongoose.model("Prediction", PredictionSChema);
