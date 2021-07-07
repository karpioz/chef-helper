// This file contains all routes involved recipes

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRecipes,
  getRecipeById,
  getBookmarkedRecipes,
  getRecipeToUpdateById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  updateRecipeBookmark,
} from "../controllers/recipesController.js";

// middleware
import { protect, adminAuth } from "../middleware/authMiddleware.js";

// routes
// read all recipes data
router.get("/", getRecipes);
// read specific recipe data
router.get("/bookmarked", getBookmarkedRecipes);
// read specific recipe data
router.get("/:id", getRecipeById);
// read specific recipe data to update
router.get("/update/:id", getRecipeToUpdateById);
// create new recipe
router.post("/", createRecipe);
// delete recipe
router.delete("/:id", protect, adminAuth, deleteRecipe);
// update recipe
router.patch("/update/:id", updateRecipe);
// update recipe bookmark
router.patch("/update/bookmark/:id", updateRecipeBookmark);

export default router;
