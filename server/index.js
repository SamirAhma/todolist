const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoute = require("./routers/todo");
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());
app.use("/api", todoRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
