// This file contains all routes involved products and ingredients

import express from "express";
const router = express.Router();

// Importing controllers
import {
  getProducts,
  createProduct,
  updateProductQuantity,
  deleteProduct,
} from "../controllers/productsController.js";

// routes
// read all products data
router.get("/", getProducts);

// create new product
router.post("/", createProduct);

// update product data
router.patch("/:id", updateProductQuantity);

// delete product from database
router.delete("/:id", deleteProduct);

export default router;
