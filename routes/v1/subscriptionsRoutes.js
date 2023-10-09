// v1/subscriptionRoutes.js

import express from "express";
import {
  cancelSubscription,
  createSubscription,
  fetchSubscriptions,
  getPlans,
  initializeTransaction,
  updatePaymentMethod,
} from "../../controllers/subscriptionsController.js";
import { authenticateUser } from "../../middlewares/auth.js";

const router = express.Router();

// Route to subscribe a user
router.route("/subscription").get(authenticateUser, fetchSubscriptions);
router.route("/create-subscription").post(createSubscription);
router.route("/initialize-transaction-with-plan").post(initializeTransaction);
router.route("/plans").get(getPlans);
router
  .route("/update-payment-method")
  .get( updatePaymentMethod);
router.route("/cancel-subscription").post(cancelSubscription);

// Add more subscription-related routes as needed

export default router;
