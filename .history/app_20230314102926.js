const express = require("express");
require('dotenv').config()
require('express-async-errors')

const PORT = process.env.PORT || 5000


const app = express();

//app.use('/')

app.get("/", (req, res) => {
  res.send("Hello World");
});

const start = async() => {
  try {await connectDB() } catch (error) {
    console.log()
  }
}

app.listen(PORT, () => {console.log(`listening on port ${8000}`);});
