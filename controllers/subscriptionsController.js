import config from "../config/config.js";
import axios from "axios";
//import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import { StatusCodes } from "http-status-codes";

// Define your route for subscription creation

export const createSubscription = async (req, res) => {
  const { plan } = req.body;
  const customer = req.user.email;

  try {
    // Prepare the request data
    const requestData = {
      customer,
      plan: "PLN_dodg11i31vy0nut",
    };

    // Make a POST request to Paystack to create the subscription
    const paystackResponse = await axios.post(
      "https://api.paystack.co/subscription",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${config.paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the Paystack response here (e.g., retrieve subscription details)
    const { data } = paystackResponse;
    const subscriptionDetails = data.data;

    // Create a new Subscription document and save it to MongoDB
    const subscription = new Subscription({
      customer: subscriptionDetails.customer,
      plan: subscriptionDetails.plan,
      // Add other relevant subscription details here
    });

    await subscription.save();

    res.status(StatusCodes.OK).json({
      message: "Subscription created and saved successfully",
      subscription,
    });
  } catch (error) {
    console.error("Paystack subscription creation and saving failed:", error);
    res
      .status(500)
      .json({ message: "Paystack subscription creation and saving failed" });
  }
};
