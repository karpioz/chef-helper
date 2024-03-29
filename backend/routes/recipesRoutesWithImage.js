// This file contains all routes involved recipes

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
} from "../controllers/recipesWithImageController.js";

// middleware
import { protect, adminAuth } from "../middleware/authMiddleware.js";

// routes
// read all recipes data
router.get("/", getRecipes);
// read specific recipe data
router.get("/:id", getRecipeById);
// read specific recipe data to update
//router.get("/update/:id", getRecipeToUpdateById);
// create new recipe
router.post("/", createRecipe);
// delete recipe
router.delete("/:id", protect, adminAuth, deleteRecipe);

export default router;
