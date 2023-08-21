const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running...`));
