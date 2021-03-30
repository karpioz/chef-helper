// This file contains all routes involved rota

import express from "express";
const router = express.Router();

// Importing controllers
import { getRota, getRotaById, createRota } from "../controllers/rotaController.js";

// routes
// read all rotas data
router.get("/", getRota);
// read specific rota data
router.get("/:id", getRotaById);
// create new recipe
router.post("/", createRota);

export default router;
