// This file contains all routes involved rota

import express from "express";
const router = express.Router();

// Importing controllers
import { getRota, createRota } from "../controllers/rotaController.js";

// routes
// read all recipes data
router.get("/", getRota);
// read specific recipe data
//router.get("/:id", getRecipeById);
// create new recipe
router.post("/", createRota);

export default router;
