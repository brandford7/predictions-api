const mongoose = require("mongoose");

const PredictionSChema = new mongoose.Schema(
  {
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
      enum: enum: ['Home Win', 'Away Win', 'Draw', 'Not Yet Played'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", PredictionSChema);
