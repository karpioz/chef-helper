import asyncHandler from "express-async-handler";
import Rota from "../models/rotaModel.js";

// @desc fetch all rotas
// @route GET /api/rota
// @access Public

const getRota = asyncHandler(async (req, res) => {
  const rota = await Rota.find({});
  res.json(rota);
});

// @desc fetch rota by id
// @route GET /api/rota/:id
// @access Public

const getRotaById = asyncHandler(async (req, res) => {
  const rota = await Rota.find(req.body.id);
  res.json(rota);
});

// @desc    Create rota
// @route   POST /api/rota
// @access  Private/Admin
const createRota = asyncHandler(async (req, res) => {
  const { weeklyRota, dayId, day, date, employees } = req.body;

  const newRota = new Rota({
    weeklyRota,
    weekStart: weeklyRota[0].date,
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

export { getRota, getRotaById, createRota };
