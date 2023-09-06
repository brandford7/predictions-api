export const config = {
  port: process.env.PORT || 3000, // Port on which the Express server will listen

  // MongoDB configuration
  mongoURI:
    process.env.MONGODB_URI ||
    "mongodb+srv://brandfordk:Miscellaneous1@cluster0.azhgf.mongodb.net/successsecretsbetdb",

  // JWT (JSON Web Token) secret key for user authentication
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",

  // CORS (Cross-Origin Resource Sharing) configuration
  allowedOrigins: process.env.ALLOWED_ORIGINS || ["http://localhost:3000"],

  // Other configuration options can be added here
};
