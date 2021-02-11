// mongoDB Object Modelling
import mongoose from "mongoose";

// EDAMAM search query
// https://api.edamam.com/search?q=pizza&app_id=a1bd6451&app_key=31f1c205b4c0de6c1b021ac04c06efe6&from=0&to=9

const IngredientSchema = new mongoose.Schema({
  ingredientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  productName: String,
  weight: Number,
});

const recipeSchema = new mongoose.Schema({
  recipe: {
    label: {
      type: "String",
    },
    image: {
      type: "String",
    },
    HealthLabels: {
      type: "Array",
    },
    ingredientLines: {
      type: ["String"],
    },
    ingredients: [IngredientSchema],
    calories: {
      type: "Number",
    },
    totalTime: {
      type: "Number",
    },
  },
  bookmarked: {
    type: "Boolean",
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
