import express from "express";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/signup", (req, res) => {
  res.json({
    data: "you hit signup endpoint",
  });
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
