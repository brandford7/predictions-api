const express = require("express");
const connectDB = require("./db/dbConnect");
require("dotenv").config();
require("express-async-errors");

const predictionRoutes=require('./routes/predictions')
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth')

const app = express();

app.use(express.json())

//app.use('/')

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes

//app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/predictions',predictionRoutes)


//middlewares




//initializing app
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
