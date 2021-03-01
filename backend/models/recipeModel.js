// mongoDB Object Modelling
import mongoose from "mongoose";

// EDAMAM search query
// https://api.edamam.com/search?q=pizza&app_id=a1bd6451&app_key=31f1c205b4c0de6c1b021ac04c06efe6&from=0&to=9

/* const IngredientSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  text: String,
  weight: Number,
}); */

const recipeSchema = new mongoose.Schema(
  {
    label: {
      type: "String",
    },
    image: {
      type: "String",
    },
    healthLabels: {
      type: "Array",
    },
    ingredientLines: {
      type: ["String"],
    },
    ingredients: [
      {
        _id: false,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    calories: {
      type: "Number",
    },
    totalTime: {
      type: "Number",
    },
    bookmarked: {
      type: "Boolean",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
