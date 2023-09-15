import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = {
      userId: payload.userId,
      username: payload.name,
      email: payload.email,
      role: payload.role, // Include the user's role in the request
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication invalid" });
  }
};

// roleAuthMiddleware.js

export const checkRole = (role) => {
  return (req, res, next) => {
    const user = req.user; // Assuming you have user data in the request object
    if (user && user.role === role) {
      // User has the required role, allow the request to proceed
      next();
    } else {
      // User does not have the required role, send an "Access denied" response
      res.status(403).json({ message: `Access denied. ${role} authorization required.` });
    }
  };
};
