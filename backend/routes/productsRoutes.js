// This file contains all routes involved products and ingredients

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getProducts,
  updateProductQuantity,
  updateProductQuantityTwo,
} from "../controllers/productsController.js";

// routes
// read all products data
router.get("/", getProducts);

// update product data
router.put("/update/:id", updateProductQuantityTwo);

export default router;
