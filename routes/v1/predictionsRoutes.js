import express from "express";

const router = express.Router();

router.route("/").get(getAllPredictions).post(createPrediction);
router.route("/:id").get(getSinglePrediction).delete(deletePrediction).put(updatePrediction);

export default router;
