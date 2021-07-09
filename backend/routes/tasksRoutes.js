// This file contains all routes involved products and ingredients

import express from "express";
const router = express.Router();

// Importing middleware security functions
import { protect, adminAuth } from "../middleware/authMiddleware.js";

// Importing controllers
import {
  getTasks,
  getHighPriorityTasks,
  createTask,
  updateTask,
  updateTaskFinished,
  deleteTask,
} from "../controllers/tasksController.js";

// routes
// read all tasks
router.get("/", getTasks);

// read gigh priority tasks
router.get("/high", getHighPriorityTasks);

// create new task
router.post("/", protect, createTask);

// update task
router.patch("/admin/:id", protect, adminAuth, updateTask);

// update finished tasks
router.patch("/finished/:id", protect, updateTaskFinished);

// delete  finished task from database
router.delete("/:id", protect, adminAuth, deleteTask);

export default router;
