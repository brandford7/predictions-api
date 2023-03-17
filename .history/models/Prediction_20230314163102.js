const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({
    homeTeam: {
        type: String,
        required:[true,'you must specify a home tea,']
    }

}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
