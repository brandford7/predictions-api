import Prediction from "../models/Prediction.js";
import User from "../models/User.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

//get all predictions
export const getAllPredictions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter = {};

    if (req.query.isVIP) {
      filter.isVIP = req.query.isVIP === 'true';
    }

    if (req.query.search) {
      const searchQuery = new RegExp(req.query.search, 'i');
      filter.$or = [
        { game: searchQuery },
        { competition: searchQuery },
        { status: searchQuery },
        { odd: searchQuery },
        { tip: searchQuery },
      ];
    }

    if (req.query.date) {
      const selectedDate = new Date(req.query.date);
      const nextDate = new Date(new Date(selectedDate).setDate(selectedDate.getDate() + 1));
      filter.startPeriod = {
        $gte: selectedDate,
        $lt: nextDate,
      };
    }

    if (req.query.competition) {
      filter.competition = req.query.competition;
    }

    const sortField = req.query.sort || 'createdAt';
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const predictions = await Prediction.find(filter)
      .sort({ [sortField]: sortDirection })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalPredictions = await Prediction.countDocuments(filter);

    res.status(StatusCodes.OK).json({
      total: totalPredictions,
      page,
      pageSize,
      predictions,
    });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
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
