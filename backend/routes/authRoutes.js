// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

// importing controllers
import {
  signupUser,
  signupUserWithSendGrid,
} from "../controllers/authController.js";

// importing validators
import { userSignUpValidator } from "../validators/authValidator.js";
import { runValidation } from "../validators/index.js";

// routes
router.post(
  "/signup",
  userSignUpValidator,
  runValidation,
  signupUserWithSendGrid
);

export default router;
