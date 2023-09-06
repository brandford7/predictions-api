import express from "express";
import { config } from "./config/config.js";
import connectDB from "./config/dbConnect.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

const start = app.listen(500, () => {
  connectDB();
  console.log("app started");
});
