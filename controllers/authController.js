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
    .json({ user:{name: user.username, role: user.role}, token });
};

export const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });

};

export const getUserProfile = async (req, res) => {
  try {
    // Get the user's ID from the authenticated user
    const userId = req.user.userId;

    // Fetch user data from the database
    const user = await User.findById(userId); // Replace 'User' with your actual User model

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Get user's email and username from the database
    let { email, username, password, customer } = user;

    // Send the user data and subscriptions as a response
    res.status(StatusCodes.OK).json({ email, username, password, customer });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// Function to allow the currently logged-in user to update the profile details
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Retrieve the user by ID using req.user
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user properties
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


