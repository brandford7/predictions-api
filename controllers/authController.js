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

  try {
    // Check if the email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }

    // Determine the user's role (admin or user)
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    // Create a Paystack customer with the user's email
    const createCustomerResponse = await paystack.customer.create({ email });

    if (!createCustomerResponse.status) {
      console.error(
        "Error creating customer: ",
        createCustomerResponse.message
      );
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `Error creating customer: ${createCustomerResponse.message}`,
      });
    }

    // Extract the customerCode and customerId from the Paystack API response
    const { customer_code: customerCode, id: customerId } =
      createCustomerResponse.data;

    // Create a user with the provided data and associate the customerCode and customerId
    const user = new User({
      username,
      email,
      password,
      role,
      customer: {
        customerCode,
        customerId,
      },
    });

    // Save the user with the associated customerCode and customerId
    await user.save();

    // Generate a token (you need to define the createJWT method in your User model)
    const token = user.createJWT();

    return res.status(StatusCodes.CREATED).json({
      message: "Registration successful",
      user,
      token,
      customerCode: user.customer.customerCode,
      customerId: user.customer.customerId, // Access customerId within the customer object
    
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
const lowercaseEmail = email.toLowerCase();

  // Find the user by email or username
  const user = await User.findOne({ email:lowercaseEmail });

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
