import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUserDetails,
  getUserById,
} from "../../controllers/authController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router
  .route("/admin/:id")
  .get(authenticateUser, checkRole("admin"), getUserById)
  .patch(authenticateUser, checkRole("admin"), updateUserDetails);

export default router;
