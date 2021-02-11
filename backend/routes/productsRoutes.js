// This file contains all routes involved products and ingredients

import express from "express";
const router = express.Router();

// Importing controllers
import { getProducts } from "../controllers/productsController.js";

// routes
// read specific user data
router.get("/", getProducts);

export default router;
