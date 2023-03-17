const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema({

    
}, { timestamps: true });

module.exports = mongoose.model("Prediction", PredictionSChema);
