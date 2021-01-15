// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

// importing controllers
import { signupUser } from "../controllers/authController.js";

// importing validators
import { userSignUpValidator } from "../validators/authValidator.js";
import { runValidation } from "../validators/index.js";

// routes
router.post("/signup", userSignUpValidator, runValidation, signupUser);

export default router;
