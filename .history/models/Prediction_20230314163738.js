const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    homeTeam: {
      type: String,
      required: [true, "you must specify a home team,"],
    },
    awayTeam: {
      type: String,
      required: [true, "you must specify a home team,"],
    },
    bet: {
      type: String,
      required: [true, "you must specify a bet"],
      /*  enum: ['Home Win', 'Away Win', 'Draw', ''],*/
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", PredictionSChema);
