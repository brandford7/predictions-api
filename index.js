import express from "express";
import config from "./config/config.js";

import authRoutes from "./authRoutes";
import predictionsRoutes from "./predictionsRoutes";
import usersRoutes from "./usersRoutes";
import subscriptionsRoutes from "./subscriptionsRoutes";

import dotenv from "dotenv";
import { startServer } from "./server.js";

export const app = express();
dotenv.config();

//middlewares
app.use(express.json());

//routes
/*app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/predictions", predictionsRoutes);
app.use("/api/v1/subscriptions", subscriptionsRoutes);
app.use("/api/v1/users", usersRoutes);*/

startServer();
