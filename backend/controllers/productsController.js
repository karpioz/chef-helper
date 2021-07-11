import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ name: 1 });
  res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, countInStock, defaultWeightInGrams } = req.body;

  const newProduct = new Product({
    name,
    price,
    countInStock,
    defaultWeightInGrams,
  });

  // checking database for existing product
  Product.findOne({ name }).exec((err, product) => {
    if (product) {
      return res.status(400).json({
        error: "This product is already in the pantry",
      });
    } else {
      newProduct.save();
      return res.status(201).json({
        message: "New product added to the pantry",
      });
    }
  });
});

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProductQuantity = asyncHandler(async (req, res) => {
  const { name, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, createProduct, updateProductQuantity, deleteProduct };
