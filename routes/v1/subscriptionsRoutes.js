// v1/subscriptionRoutes.js

import express from "express";
const router = express.Router();

// Route to subscribe a user
router.route("/").post("/subscribe");

// Route to unsubscribe a user
router.route("/").post("/unsubscribe");

// Add more subscription-related routes as needed

export default router;
