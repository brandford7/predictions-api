import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  
  getUserProfile,
  updateUserProfile,
} from "../../controllers/authController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile);



export default router;
