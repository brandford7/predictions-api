import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema(
  {
    game: {
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
      default: "pending",
    },
    odd: {
      type: Number,
    },
    isVIP: {
      type: Boolean,
      default: false, // Set to true for VIP predictions
    },
    status: {
      type: String,
      enum: ["pending", "won","lost"],
      default: "pending",
    },

    // Add more fields as needed
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Prediction = mongoose.model("Prediction", PredictionSchema);

export default Prediction;
