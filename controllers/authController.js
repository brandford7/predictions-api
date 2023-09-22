import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";
import User from "../models/User.js";
// Adjust the path to your User model
import Paystack from "@paystack/paystack-sdk";
import config from "../config/config.js";

const paystack = new Paystack(config.paystackSecretKey);

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = new User({ username, email, password, role });
  const token = user.createJWT();

  try {
    // Create a Paystack customer with the user's email
    const createCustomerResponse = await paystack.customer.create({ email });

    if (createCustomerResponse.status === false) {
      console.log("Error creating customer: ", createCustomerResponse.message);
      return res
        .status(400)
        .send(`Error creating customer: ${createCustomerResponse.message}`);
    }

    // Extract the customer_code from the Paystack API response
    const customer = createCustomerResponse.data;

    // Associate the customer_code with the user and save the user
    user.customerCode = customer.customer_code;
    await user.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Registration successful", user, token, customer });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Registration failed" });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Find the user by email or username
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("user not found");
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Create and send a JWT token upon successful login
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: user.username, token, role: user.role });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
