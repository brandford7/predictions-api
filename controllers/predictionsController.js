import Prediction from "../models/Prediction.js";
import User from "../models/User.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

export const getAllPredictions = async (req, res) => {
  try {
    // Parse query parameters and provide default values
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter = {};

    // Check if 'isVIP' is provided in the query and convert to boolean
    if (req.query.isVIP) {
      filter.isVIP = req.query.isVIP === "true";
    }

    // Check if 'search' query is provided and create a case-insensitive search regex
    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, "i");
      filter.$or = [
        { game: searchQuery },
        { competition: searchQuery },
        { status: searchQuery },
        { odd: searchQuery },
        // Add more fields to search as needed
      ];
    }

    // Determine sort field and direction, with defaults
    const sortField = req.query.sort || "createdAt";
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Query the database with the filter and sort parameters
    const predictions = await Prediction.find(filter)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .lean();

    // Count total predictions based on the filter
    const totalPredictions = await Prediction.countDocuments(filter);

    // Send the response
    res.status(StatusCodes.OK).json({
      total: totalPredictions,
      page,
      pageSize,
      predictions,
    });
  } catch (error) {
    // Handle any errors (e.g., database errors)
    console.error("Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

// Function to get a specific prediction by ID
export const getPredictionById = async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);
  if (!prediction) {
    throw new NotFoundError("prediction not found");
  }
  res.json(prediction);
};
// Function to create a new prediction
export const createPrediction = async (req, res) => {
  try {
    const newPrediction = await Prediction.create(req.body);

    res.status(StatusCodes.CREATED).json({
      prediction: newPrediction,
      message: "Prediction created successfully",
    });
  } catch (error) {
    console.error("Error creating prediction:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to create prediction',
      error: error.message, // Include the error message for debugging
    });
  }
};
// Function to update a prediction by ID
export const updatePrediction = async (req, res) => {
  const {
    params: { id: predictionId },
    body: { game, competition, startPeriod, tip, isVIP, result, odd, status },
  } = req;

  const prediction = await Prediction.findByIdAndUpdate(
    { _id: predictionId, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!prediction) {
    throw new NotFoundError({ message: "Prediction not found" });
  }

  prediction.game = game;
  prediction.competition = competition;
  prediction.startPeriod = startPeriod;
  prediction.tip = tip;
  prediction.isVIP = isVIP;
  prediction.result = result;
  prediction.odd = odd;
  prediction.status = status;

  await prediction.save();

  res.json({ message: "Prediction updated successfully" });
};

// Function to delete a prediction by ID
export const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndRemove(req.params.id);
    if (!prediction) {
      throw new NotFoundError({ message: "Prediction not found" });
    }
    res.json({ message: "Prediction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
