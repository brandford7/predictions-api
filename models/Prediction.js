import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema(
  {
    game: {
      type: String,
      required: true,index: true
    },
    competition: {
      type: String,
      required: true,index: true
    },
    startPeriod: {
      type: Date,
      required: true,
      index: true
    },
    tip: {
      type: String,
      required: true,
      index: true
    },
    result: {
      type: String,
      default: "pending",
      index: true
    },
    odd: {
      type: Number,
      index: true
    },
    isVIP: {
      type: Boolean,
      default: false, // Set to true for VIP predictions
      index: true
    },
    status: {
      type: String,
      enum: ["pending", "won","lost"],
      default: "pending",
      index: true
    },

    // Add more fields as needed
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;
