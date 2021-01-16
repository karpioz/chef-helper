// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

// importing controllers
import {
  signupUser,
  signupUserWithSendGrid,
  loginUser,
  accountActivation,
} from "../controllers/authController.js";

// importing validators
import {
  userLoginValidator,
  userSignUpValidator,
} from "../validators/authValidator.js";
import { runValidation } from "../validators/index.js";

// routes
// sign-up
router.post(
  "/signup",
  userSignUpValidator,
  runValidation,
  signupUserWithSendGrid
);

// log-in
router.post("/login", userLoginValidator, loginUser);

// account email activation
router.post("/activate", accountActivation);

export default router;
