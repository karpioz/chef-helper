// This file contains all routes involved rota

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRota,
  getRotaById,
  createRota,
  updateRota,
} from "../controllers/rotaController.js";

// middleware
import { protect, adminAuth } from "../middleware/authMiddleware.js";

// routes
// read all rotas data
router.get("/", getRota);
// read specific rota data
router.get("/:id", getRotaById);
// create new rota
router.post("/", createRota);
// update rota
router.patch("/:id", protect, adminAuth, updateRota);

export default router;
