const express = require("express");
require('dotenv').config()
re

const PORT = process.env.PORT || 5000


const app = express();

//app.use('/')

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(PORT, () => {console.log(`listening on port ${8000}`);});
