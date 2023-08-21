const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const mongoose = require("mongoose");
const productRoute = require("./routes/products");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/products", productRoute);

app.listen(process.env.PORT, () => console.log(`Server running...`));
