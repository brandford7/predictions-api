const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({
    homeTeam: {
        type: String,
        required:
    }

}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
