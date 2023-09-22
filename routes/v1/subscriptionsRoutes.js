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
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

// Route to subscribe a user
router.route("/subscription").get(authenticateUser, fetchSubscriptions);
router.route("/create-subscription").post(authenticateUser, createSubscription);
router.route("/initialize-transaction-with-plan").post(initializeTransaction);
router.route("/plans").get(authenticateUser, getPlans);
router
  .route("/update-payment-method")
  .get(authenticateUser, updatePaymentMethod);
router.route("/cancel-subscription").post(authenticateUser, cancelSubscription);

// Add more subscription-related routes as needed

export default router;
