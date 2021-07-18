import path from "path";
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
import rotaRoutes from "./routes/rotaRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import recipesRoutesWithImage from "./routes/recipesRoutesWithImage.js";
import productsRoutes from "./routes/productsRoutes.js";
import tasksRoutes from "./routes/tasksRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import uploadRoutesCloudinary from "./routes/uploadRoutesCloudinary.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// apps middlewares

//app.use(bodyParser.json());
// morgan - HTTP request logger
app.use(morgan("dev"));
// cors allow request from all origins
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// middleware
app.use("/api", authRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/rota", rotaRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/upload/cloudinary", uploadRoutesCloudinary);

// making uploads folder accessible for browser
const __path = path.resolve();
app.use("/uploads", express.static(path.join(__path, "/uploads")));

// preparing for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__path, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__path, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT || 8000;

// .cyan.underline colors package for changing terminal output
app.listen(
  PORT,
  console.log(
    `Server is runing in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
      .underline
  )
);
