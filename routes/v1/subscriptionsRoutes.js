// v1/subscriptionRoutes.js

import express from "express";
import { createSubscription } from "../../controllers/subscriptionsController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";


const router = express.Router();

// Route to subscribe a user
router.route("/").post(authenticateUser, checkRole('admin'),createSubscription);

// Add more subscription-related routes as needed

export default router;
