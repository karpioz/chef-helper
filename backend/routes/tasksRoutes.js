// This file contains all routes involved products and ingredients

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController.js";

// routes
// read all products data
router.get("/", getTasks);

// create new product
router.post("/", createTask);

// update product data
router.patch("/:id", updateTask);

// delete product from database
router.delete("/:id", deleteTask);

export default router;
