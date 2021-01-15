import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./config/db.js";

dotenv.config();

// DB Connection from config.ConnectDB file
connectDB();

// importing routes
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

// apps middlewares
// morgan - HTTP request logger
app.use(morgan("dev"));
// cors allow request from all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// middleware
app.use("/api", authRoutes);

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
