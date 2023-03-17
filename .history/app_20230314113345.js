const express = require("express");
const connectDB = require("./db/dbConnect");
require("dotenv").config();
require("express-async-errors");

const predictionRoutes=
const PORT = process.env.PORT || 5000;

const app = express();

//app.use('/')

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes

//app.use('/api/v1/auth')
app.use('/api/v1/predictions',predictionRoutes)


//middlewares




//initializing app
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`listening on port ${8000}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
