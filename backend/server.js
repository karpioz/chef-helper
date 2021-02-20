import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";

dotenv.config();

// DB Connection from config.ConnectDB file
connectDB();

// importing routes
import authRoutes from "./routes/authRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();
app.use(express.json());

// apps middlewares

//app.use(bodyParser.json());
// morgan - HTTP request logger
app.use(morgan("dev"));
// cors allow request from all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// middleware
app.use("/api", authRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;

// .cyan.underline colors package for changing terminal output
app.listen(
  PORT,
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline
  )
);
