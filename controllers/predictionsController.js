import Prediction from "../models/Prediction.js";

// Function to get all predictions
export const getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find();
    res.json({ total: predictions.length, predictions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get a specific prediction by ID
export const getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }
    res.json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to create a new prediction
export const createPrediction = async (req, res) => {
  try {
    const { game, competition, startPeriod, tip, isVIP, result, odd } =
      req.body;

    const existingPrediction = await Prediction.findOne({
      game,
      competition,
      startPeriod,
    });

    if (existingPrediction) {
      // Check if the dates are the same
      if (
        existingPrediction.date &&
        startPeriod &&
        existingPrediction.date.toDateString() === startPeriod.toDateString()
      ) {
        return res.status(400).json({ message: "Duplicate prediction" });
      }
    }

    const newPrediction = new Prediction({
      game,
      competition,
      startPeriod,
      tip,
      isVIP,
      result,
      odd,
    });

    await newPrediction.save();

    res
      .status(201)
      .json({ newPrediction, message: "Prediction created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to update a prediction by ID
export const updatePrediction = async (req, res) => {
  try {
    const {
      params: { id: predictionId },
      body: { game, competition, startPeriod, tip, isVIP, result, odd },
    } = req;

    const prediction = await Prediction.findByIdAndUpdate(
      { _id: predictionId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    await prediction.save();

    res.json({ message: "Prediction updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to delete a prediction by ID
export const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndRemove(req.params.id);
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }
    res.json({ message: "Prediction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
