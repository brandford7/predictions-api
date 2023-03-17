const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({
    homeTeam:{type:String:}

}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
