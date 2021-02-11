import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

export { getProducts };
