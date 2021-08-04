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
// read all recipes
router.get("/", getRecipes);
// read only bookmarked recipes
router.get("/bookmarked", getBookmarkedRecipes);
// read specific recipe
router.get("/:id", getRecipeById);
// read specific recipe to update
router.get("/update/:id", getRecipeToUpdateById);
// create new recipe
router.post("/", createRecipe);
// delete recipe
router.delete("/:id", protect, adminAuth, deleteRecipe);
// update recipe
router.patch("/update/:id", protect, adminAuth, updateRecipe);
// update recipe bookmark by recipe's id
router.patch("/update/bookmark/:id", protect, adminAuth, updateRecipeBookmark);

export default router;
