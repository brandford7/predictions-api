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
        { username: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server error" });
  }
};

// Function to get the profile of the currently logged-in user


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

// Function to allow admin get a user's details by ID

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");;
  if (!user) {
    throw new NotFoundError("user not found");
  }
  res.status(StatusCodes.OK).json({
    user: user,
  });
};

// Function to allow admin update a user's details by ID

export const updateUserDetails = async (req, res) => {
  const {
    params: { id: userId },
    body: { username, email, password, role },
  } = req;

  const user = await User.findByIdAndUpdate(
    { _id: userId, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new NotFoundError({ message: "user not found" });
  }

  user.username = username;
  user.email = email;
  user.password = password;
  user.role = role;
  await user.save();

  res.json({ message: "User details updated successfully" });
};



