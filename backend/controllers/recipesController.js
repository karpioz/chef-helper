import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";
import Product from "../models/productModel.js";

// @desc fetch all recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productName",
        foreignField: "name",
        as: "output",
      },
    },
  ]);
  res.json(recipes);
});

const readRecipeData = () => {
  //
};

export { getRecipes, readRecipeData };
