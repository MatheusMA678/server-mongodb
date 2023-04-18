const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const MONGO_URL = process.env.DATABASE_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const taskRoutes = require("./routes/taskRoutes.js");

app.use("/tasks", taskRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Conexão com o MongoDB realizada com sucesso.");
    app.listen(3000);
  })
  .catch((error) => console.error(error));
