import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Adjust the path to your User model

const secretKey = "your-secret-key"; // Replace with your secure secret key

export const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    res.json({ message: "Registration successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and send a JWT token upon successful login
    const token = await user.createJWT();

    res.json({ message: "Login successful", token, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // You can include additional logout-related logic here if needed

    // Clear the token from the client-side (e.g., by removing it from cookies or local storage)
    // Example for clearing a token cookie:
    res.clearCookie("jwtToken"); // Replace 'jwtToken' with your actual cookie name

    // Send a response indicating successful logout
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};
