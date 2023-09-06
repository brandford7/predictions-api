import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  match: {
    type: String,
    required: true,
  },
  competition: {
    type: String,
    required: true,
  },
  startPeriod: {
    type: Date,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  },
  result: {
      type: String,
      default: null
  },
  odd: {
    type: Number,
  },
  isVIP: {
    type: Boolean,
    default: false, // Set to true for VIP predictions
  },
  // Add more fields as needed
});

const Prediction = mongoose.model("Prediction", predictionSchema);

export default Prediction;
