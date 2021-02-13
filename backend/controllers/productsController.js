import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc update product quantity
// @route PATCH /api/products/update/:id
// @access Private

const updateProductQuantity = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.set(req.body).save();
  } catch (err) {
    next(err);
  }
});

const updateProductQuantityTwo = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.save();
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProducts, updateProductQuantity, updateProductQuantityTwo };
