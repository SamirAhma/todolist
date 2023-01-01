const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoute = require("./routers/todo");
const path = require("path");
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
app.use(express.static("../client/dist"));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
