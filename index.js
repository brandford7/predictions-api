import express from "express";
//import config from "./config/config.js";

import authRoutes from "./routes/v1/authRoutes.js";
import predictionsRoutes from "./routes/v1/predictionsRoutes.js";
import usersRoutes from "./routes/v1/usersRoutes.js";
import subscriptionsRoutes from "./routes/v1/subscriptionsRoutes.js";

import dotenv from "dotenv";
import { startServer } from "./server.js";

export const app = express();
dotenv.config();

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/predictions", predictionsRoutes);
app.use("/api/v1/subscriptions", subscriptionsRoutes);
app.use("/api/v1/users", usersRoutes);

startServer();
