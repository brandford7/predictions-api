import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully" });

    await newUser.save();
  } catch (err) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  })(req, res, next);
};

passport.use(
  new LocalStrategy(
    { usernameField: "identifier", passwordField: "password" },
    async (identifier, password, done) => {
      try {
        // Find the user by email or username in the database
        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        // If the user does not exist or the password is incorrect
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false);
        }

        // If the user and password are correct, return the user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Function to log out a user
export const logoutUser = (req, res) => {
  // Passport.js provides a `logout` function to clear the user's session
  req.logout();

  // Optionally, you can clear any tokens stored on the client-side here

  res.json({ message: "User logged out successfully" });
};
