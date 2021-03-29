// This file contains all routes involved authentication

import express from "express";
const router = express.Router();

// importing controllers
import {
  signupUser,
  signupUserWithSendGrid,
  signupUserWithSendGridByAdmin,
  loginUser,
  accountActivation,
  authUser,
  getUserNames,
  getUsers,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";

// importing validators
import {
  userLoginValidator,
  userSignUpValidator,
} from "../validators/authValidator.js";
import { runValidation } from "../validators/index.js";
import { protect } from "../middleware/authMiddleware.js";

// routes
// sign-up
router.post(
  "/signup",
  userSignUpValidator,
  runValidation,
  signupUserWithSendGridByAdmin
);

// log-in
router.post("/login", userLoginValidator, authUser);

// account email activation
router.post("/activate", accountActivation);

// get all user namers
router.get("/users/names", getUserNames);

//get all users data
router.get("/users/", getUsers);

// delete user
router.delete("/:id", deleteUser);

// get user's profile
router.get("/users/profile/", protect, getUserProfile);

// update user's profile
router.put("/users/profile/", protect, updateUserProfile);

export default router;
