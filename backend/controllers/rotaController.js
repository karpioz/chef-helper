import asyncHandler from "express-async-handler";
import Rota from "../models/rotaModel.js";

// @desc fetch all recipes
// @route GET /api/recipes
// @access Public

const getRota = asyncHandler(async (req, res) => {
  const rota = await Rota.find({});
  res.json(rota);
});

// @desc    Create rota
// @route   POST /api/rota
// @access  Private/Admin
const createRota = asyncHandler(async (req, res) => {
  const { dayId, day, date, employees } = req.body;

  const newRota = new Rota({
    dayId,
    day,
    date,
    employees,
  });

  if (!newRota) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

  await newRota.save();
  return res.status(201).json({
    message: "New Rota has been created",
  });
});

export { getRota, createRota };
