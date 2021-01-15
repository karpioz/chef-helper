// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

// importing controllers
import { signupUser } from "../controllers/authController.js";

// routes
router.get("/signup", signupUser);

export default router;
