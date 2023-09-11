import express from "express";
import { createPrediction, deletePrediction, getAllPredictions, getPredictionById, updatePrediction } from "../../controllers/predictionsController.js";
import authenticateUser from "../../middlewares/auth.js"

const router = express.Router();

router.route("/").get(authenticateUser,getAllPredictions).post(createPrediction);
router.route("/:id").get(getPredictionById).delete(deletePrediction).put(updatePrediction);

export default router;
