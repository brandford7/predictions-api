const express = require("express");
require('dotenv').config()

const PORT = process.env.PORT || 5000


const app = express();

app.listen(PORT, () => {console.log(`listening on port ${8000}`);});
