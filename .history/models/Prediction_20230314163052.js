const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({
    homeTeam: {
        type: String,
        required:[true,'you must']
    }

}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
