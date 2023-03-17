const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({
    homeTeam:

}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
