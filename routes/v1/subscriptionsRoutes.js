// v1/subscriptionRoutes.js

import express from "express";
import { createSubscription } from "../../controllers/subscriptionsController.js";

const router = express.Router();

// Route to subscribe a user
router.route("/subscribe").post(createSubscription);



// Add more subscription-related routes as needed

export default router;
