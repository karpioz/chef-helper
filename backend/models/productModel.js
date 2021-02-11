// mongoDB Object Modelling
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    countInStock: {
      type: Number,
    },
    price: {
      type: Number,
    },
    defaultWeightInGrams: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
