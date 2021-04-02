// This file contains all routes involved rota

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getRota,
  getRotaById,
  createRota,
  updateRota,
  deleteRota,
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
// delete rota
router.delete("/:id", protect, adminAuth, deleteRota);

export default router;
