import Paystack from "@paystack/paystack-sdk";
import User from "../models/User.js";
import config from "../config/config.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";


const paystack = new Paystack(config.paystackSecretKey);

export const getAllUsers = async (req, res) => {
  try {
    // Defined a filter object to store filter criteria
    const filter = {};

    // Check if a search query parameter exists and add it to the filter
    if (req.query.search) {
      filter.$or = [
        { username: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        // Add more fields to search as needed
      ];
    }

    // Check if other filtering parameters exist and add them to the filter
    if (req.query.date) {
      filter.date = req.query.date;
    }

    if (req.query.username) {
      filter.username = req.query.username;
    }

    // Use the filter object to query the database
    const users = await User.find(filter);

    res.status(StatusCodes.OK).json({ count: users.length, users });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server error" });
  }
};


// Function to get the profile of the currently logged-in user

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


// Function to allow admin delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      throw new NotFoundError({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Function to create a new user by admin

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    user: newUser,
    message: "User created successfully",
  });
};
