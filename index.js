import express from "express";
import xss from "xss";
import helmet from 'helmet'
import authRoutes from "./routes/v1/authRoutes.js";
import predictionsRoutes from "./routes/v1/predictionsRoutes.js";
import usersRoutes from "./routes/v1/usersRoutes.js";
import subscriptionsRoutes from "./routes/v1/subscriptionsRoutes.js";
import rateLimit from "express-rate-limit";
import notFoundMiddleware from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import "express-async-errors";
import cors from "cors";

import dotenv from "dotenv";
import { startServer } from "./server.js";

export const app = express();
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 requests per 15 minutes
});

//app.use(limiter);
//middlewares
app.use(express.json());
app.use(helmet());



const corsOptions = {
  origin: true,
  credentials: true
}
app.options('*', cors(corsOptions)); 
var html = xss('<script>alert("xss");</script>');
console.log(html);

//routes
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/predictions", predictionsRoutes);
app.use("/api/v1/subscriptions", subscriptionsRoutes);
app.use("/api/v1/users", usersRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

startServer();
