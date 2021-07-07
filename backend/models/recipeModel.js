// mongoDB Object Modelling
import mongoose from "mongoose";

// EDAMAM search query
// https://api.edamam.com/search?q=pizza&app_id=a1bd6451&app_key=31f1c205b4c0de6c1b021ac04c06efe6&from=0&to=9

const recipeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    image: {
      type: String,
    },
    healthLabels: {
      type: [String],
    },
    ingredientLines: {
      type: [String],
    },
    ingredients: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        text: {
          type: String,
        },
        weight: {
          type: Number,
        },
      },
    ],
    calories: {
      type: Number,
    },
    totalTime: {
      type: Number,
    },
    bookmarked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
