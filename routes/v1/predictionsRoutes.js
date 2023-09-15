import express from "express";
import {
  createPrediction,
  deletePrediction,
  getAllPredictions,
  getFreePredictions,
  getPredictionById,
  updatePrediction,
} from "../../controllers/predictionsController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get( getAllPredictions).get(getFreePredictions)
  .post(authenticateUser, checkRole("admin"), createPrediction);
router
  .route("/:id")
  .get(authenticateUser, getPredictionById)
  .delete(authenticateUser, deletePrediction)
  .put(authenticateUser, updatePrediction);

export default router;

