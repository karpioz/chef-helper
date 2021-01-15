import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// importing routes
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

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
