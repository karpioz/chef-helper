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
  updateUserRole,
} from "../controllers/authController.js";

// importing validators
import {
  userLoginValidator,
  userSignUpValidator,
} from "../validators/authValidator.js";
import { runValidation } from "../validators/index.js";
import { protect, adminAuth } from "../middleware/authMiddleware.js";

// routes
// sign-up
router.post(
  "/signup",
  userSignUpValidator,
  runValidation,
  signupUserWithSendGridByAdmin
);
// account email activation
router.post("/activate", accountActivation);

// log-in
router.post("/login", userLoginValidator, authUser);

// get all user namers
router.get("/users/names", getUserNames);

//get all users data
router.get("/users/", getUsers);

// delete user by id
router.delete("/users/:id", protect, adminAuth, deleteUser);

// get user's profile
router.get("/users/profile/", protect, getUserProfile);

// update user's profile
router.put("/users/profile/", protect, updateUserProfile);

// update user's role by admin only
router.patch("/users/admin/:id", protect, adminAuth, updateUserRole);

export default router;
