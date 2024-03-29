import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT,
  // MongoDB configuration
  mongoURI: process.env.MONGODB_URI,
  // JWT (JSON Web Token) secret key for user authentication
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtLifetime: process.env.JWT_LIFETIME,

  // CORS (Cross-Origin Resource Sharing) configuration
  allowedOrigins: process.env.ALLOWED_ORIGINS || ["http://localhost:3000"],
  nodeEnv: process.env.NODE_ENV,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  paystackSubscriptionPlanId:process.env.PAYSTACK_SUBSCRIPTION_PLAN_ID,

  // Other configuration options can be added here
};

export default config;
