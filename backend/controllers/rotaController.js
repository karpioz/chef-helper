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
// @access Private

const getRotaById = asyncHandler(async (req, res) => {
  const rota = await Rota.findById(req.params.id);
  if (rota) {
    res.json(rota);
  } else {
    res.status(404);
    console.log(err.message);
    //throw new Error('rota not found')
  }
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

// @desc    Update rota
// @route   POST /api/rota
// @access  Private/Admin

const updateRota = asyncHandler(async (req, res) => {
  const { weeklyRota } = req.body;

  const rota = await Rota.findById(req.params.id);

  if (rota) {
    rota.weeklyRota = weeklyRota;

    const updatedRota = await rota.save();

    res.json({
      message: "Rota has been updated",
    });
  } else {
    res.status(404).json({
      error: "Rota not found",
    });
  }
});

// @desc delete rota
// @route DELETE /api/rota/:id
// @access Private/Admin
const deleteRota = asyncHandler(async (req, res) => {
  try {
    const rota = await Rota.findById(req.params.id);
    if (rota) {
      await rota.remove();
      res.json({
        message: "rota has been removed",
      });
    } else {
      res.status(404).json({
        error: "rota not found",
      });
    }
  } catch (error) {}
});

export { getRota, getRotaById, createRota, updateRota, deleteRota };
