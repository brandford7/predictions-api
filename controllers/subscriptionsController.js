import config from "../config/config.js";
import axios from "axios";
//import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
/*import { StatusCodes } from "http-status-codes";*/
import Paystack from "@paystack/paystack-sdk";
import User from "../models/User.js";
import NotFoundError from "../errors/not-found.js";

const paystack = new Paystack(config.paystackSecretKey);

/*const getPlans = () => {
  
}*/

export const getPlans = async (req, res) => {
  let fetchPlansResponse = await paystack.plan.list({});

  if (fetchPlansResponse.status === false) {
    console.log("Error fetching plans: ", fetchPlansResponse.message);
    return res
      .status(400)
      .send(`Error fetching subscriptions: ${fetchPlansResponse.message}`);
  }

  return res.status(200).send(fetchPlansResponse.data);
};
export const fetchSubscriptions = async (req, res) => {
  try {
    const userId = req.user.userId; // Replace with your actual user identification method

    const user = await User.findById(userId);
    if (!user) {
      return NotFoundError("User not found");
    }
    const  customer = user.customer;
    const customerId = customer?.customerId || null;
    
    if (!customerId) {
      throw Error("Please include a valid customer ID");
    }

    let fetchSubscriptionsResponse = await paystack.subscription.list({
      customerId,
    });

    if (fetchSubscriptionsResponse.status === false) {
      console.log(
        "Error fetching subscriptions: ",
        fetchSubscriptionsResponse.message
      );
      return res
        .status(400)
        .send(
          `Error fetching subscriptions: ${fetchSubscriptionsResponse.message}`
        );
    }

    let subscriptions = fetchSubscriptionsResponse.data.filter(
      (subscription) =>
        subscription.status === "active" ||
        subscription.status === "non-renewing"
    );

    return res.status(200).send(subscriptions);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const initializeTransaction = async (req, res) => {
  try {
    let { email, amount, plan } = req.body;

    if (!email || !amount || !plan) {
      throw Error(
        "Please provide a valid customer email, amount to charge, and plan code"
      );
    }

    let initializeTransactionResponse = await paystack.transaction.initialize({
      email,
      amount,
      plan,
      channels: ["card"], // limiting the checkout to show card, as it's the only channel that subscriptions are currently available through
      callback_url: `https://success-vip.vercel.ap/vip`,
    });

    if (initializeTransactionResponse.status === false) {
      return console.log(
        "Error initializing transaction: ",
        initializeTransactionResponse.message
      );
    }
    let transaction = initializeTransactionResponse.data;
    return res.status(200).send(transaction);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const createSubscription = async (req, res) => {
  try {
    let { customer, plan, authorization, start_date } = req.body;

    if (!customer || !plan) {
      throw Error("Please provide a valid customer code and plan ID");
    }

    let createSubscriptionResponse = await paystack.subscription.create({
      customer,
      plan,
      authorization,
      start_date,
    });

    if (createSubscriptionResponse.status === false) {
      return console.log(
        "Error creating subscription: ",
        createSubscriptionResponse.message
      );
    }
    let subscription = createSubscriptionResponse.data;
    return res.status(200).send(subscription);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    let { code, token } = req.body;

    if (!code || !token) {
      throw Error(
        "Please provide a valid customer code and subscription token"
      );
    }

    let disableSubscriptionResponse = await paystack.subscription.disable({
      code,
      token,
    });

    return res.send("Subscription successfully disabled");
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updatePaymentMethod = async (req, res) => {
  try {
    const { subscription_code } = req.query;
    const manageSubscriptionLinkResponse =
      await paystack.subscription.manageLink({
        code: subscription_code,
      });
    if (manageSubscriptionLinkResponse.status === false) {
      console.log(manageSubscriptionLinkResponse.message);
    }

    let manageSubscriptionLink = manageSubscriptionLinkResponse.data.link;
    return res.redirect(manageSubscriptionLink);
  } catch (error) {
    console.log(error);
  }
};

/* const createCustomer= async (req, res) => {
  try {
    let { email } = req.body;

    if (!email) {
      throw Error('Please include a valid email address');
    }

    let createCustomerResponse = await paystack.customer.create({
      email,
    });

    if (createCustomerResponse.status === false) {
      console.log('Error creating customer: ', createCustomerResponse.message);
      return res
        .status(400)
        .send(`Error creating customer: ${createCustomerResponse.message}`);
    }
    let customer = createCustomerResponse.data;

    // This is where you would save your customer to your DB. Here, we're mocking that by just storing the customer_code in a cookie
    res.cookie('customer', customer.customer_code);
    return res.status(200).send(customer);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
*/
