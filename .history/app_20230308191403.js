const express = require("express");
require('dotenv').config()

const PORT= process.env.PORT || 5

const app = express();

app.listen("8000", () => {console.log("listening on port 8000");});
