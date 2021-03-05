import asyncHandler from 'express-async-handler'
import Recipe from '../models/recipeModel.js'

// @desc fetch all recipes
// @route GET /api/recipes
// @access Public

const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({})
	res.json(recipes)
})

// @desc fetch single recipe
// @route GET /api/recipes/:id
// @access Public
const getRecipeById = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findById(
		req.params.id
	).populate('ingredients.productId', { name: 1, countInStock: 1 })
	if (recipe) {
		res.json(recipe)
	} else {
		res.status(404)
		console.log(err.message)
		//throw new Error('recipe not found')
	}
})

// @desc    Create a recipe
// @route   POST /api/recipes
// @access  Private/Admin
const createRecipe = asyncHandler(async (req, res) => {
	const {
		label,
		image,
		healthLabels,
		ingredientLines,
		ingredients
		//totalTime,
		//	calories
	} = req.body

	const newRecipe = new Recipe({
		label,
		image,
		healthLabels,
		ingredientLines,
		ingredients,
		calories: 1000,
		totalTime: 120
	})

	if (!newRecipe) {
		return res.status(400).json({
			error: 'Something went wrong'
		})
	}

	await newRecipe.save()
	return res.status(201).json({
		message: 'New Recipe has been created'
	})
})

export { getRecipes, getRecipeById, createRecipe }
