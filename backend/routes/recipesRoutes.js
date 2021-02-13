// This file contains all routes involved recipes

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRecipes,
  readRecipeData,
} from "../controllers/recipesController.js";

// routes
// read all recipes data
router.get("/", getRecipes);
// read specific recipe data
router.get("/:id", readRecipeData);

export default router;
