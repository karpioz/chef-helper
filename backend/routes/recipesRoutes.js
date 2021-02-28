// This file contains all routes involved recipes

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRecipes,
  getRecipeById,
  createRecipe,
} from "../controllers/recipesController.js";

// routes
// read all recipes data
router.get("/", getRecipes);
// read specific recipe data
router.get("/:id", getRecipeById);
// create new recipe
router.post("/", createRecipe);

export default router;
