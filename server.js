import config from "./config/config.js";
import { app } from "./index.js";
import connectDB from "./config/dbConnect.js";

export const startServer = () => {
  connectDB(config.mongoURI);
  app.listen(config.port, () => {
    console.log(`app started and listening on port ${config.port}`);
  });
};

