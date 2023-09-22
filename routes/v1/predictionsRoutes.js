import express from "express";
import {
  createPrediction,
  deletePrediction,
  getAllPredictions,

  getPredictionById,
  updatePrediction,
} from "../../controllers/predictionsController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, checkRole("admin"), getAllPredictions)
  .post(authenticateUser, checkRole("admin"), createPrediction);
router
  .route("/:id")
  .get(authenticateUser, getPredictionById)
  .delete(authenticateUser, checkRole("admin"), deletePrediction)
  .put(authenticateUser, checkRole("admin"), updatePrediction);

export default router;

