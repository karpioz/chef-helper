// This file contains all routes involved recipes

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRecipes,
  readRecipeData,
} from "../controllers/recipesController.js";

// routes
// read specific user data
router.get("/", getRecipes);
// read specific workshop data
router.get("/:id", readRecipeData);

export default router;
