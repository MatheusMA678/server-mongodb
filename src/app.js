// IMPORTS
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes.js");
const port = process.env.PORT || 3000;

// .env CALL
dotenv.config();

// SETUP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/", taskRoutes);

// SERVER LISTEN
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
