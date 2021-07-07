import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc fetch all recipes
// @route GET /api/recipes
// @access Public
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({});
  res.json(recipes);
});

// @desc fetch all bookmarked recipes
// @route GET /api/recipes/bookmarked
// @access Public
const getBookmarkedRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ bookmarked: true });
  res.json(recipes);
});

// @desc fetch single recipe
// @route GET /api/recipes/:id
// @access Public
const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate(
    "ingredients.productId",
    { name: 1, countInStock: 1 }
  );
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    console.log(err.message);
    //throw new Error('recipe not found')
  }
});

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private/Admin
const createRecipe = asyncHandler(async (req, res) => {
  const {
    label,
    image,
    healthLabels,
    ingredients,
    //totalTime,
    //	calories
  } = req.body;

  const newRecipe = new Recipe({
    label,
    image,
    healthLabels,
    ingredients,
    calories: 1000,
    totalTime: 120,
    bookmarked: false,
  });

  if (!newRecipe) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

  await newRecipe.save();
  return res.status(201).json({
    message: "New Recipe has been created",
  });
});

// @desc delete recipe
// @route DELETE /api/recipe/:id
// @access Private/Admin
const deleteRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      await recipe.remove();
      res.json({
        message: "recipe has been removed",
      });
    } else {
      res.status(404).json({
        error: "recipe not found",
      });
    }
  } catch (error) {}
});

// @desc fetch single recipe to update
// @route GET /api/recipes/update/:id
// @access Public
const getRecipeToUpdateById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404);
    console.log(err.message);
    //throw new Error('recipe not found')
  }
});

// @desc update recipe
// @route PATCH /api/recipes/update/:id
// @access Public
const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const {
    label,
    image,
    healthLabels,
    ingredients,
    bookmarked,
    //totalTime,
    //	calories
  } = req.body;

  if (recipe) {
    recipe.label = label;
    recipe.image = image;
    recipe.healthLabels = healthLabels;
    recipe.ingredients = ingredients;
    recipe.bookmarked = bookmarked;

    const updatedRecipe = await recipe.save();
    res.json({
      message: "Recipe has been updated",
    });
  } else {
    res.status(404).json({
      error: "Recipe not found",
    });
  }
});

// @desc    Update recipe bookmark true/false
// @route   PATCH /api/recipes/update/:id
// @access  Private/Admin
const updateRecipeBookmark = asyncHandler(async (req, res) => {
  const { bookmarked } = req.body;

  const recipe = await Recipe.findById(req.params.id);

  if (recipe) {
    recipe.bookmarked = bookmarked;

    const updatedRecipe = await recipe.save();

    res.json({
      message: "Recipe bookmark has been changed",
    });
  } else {
    res.status(404);
    throw new Error("Recipe not found");
  }
});

export {
  getRecipes,
  getBookmarkedRecipes,
  getRecipeById,
  getRecipeToUpdateById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  updateRecipeBookmark,
};
