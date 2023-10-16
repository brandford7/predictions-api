import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  createUser,
} from "../../controllers/usersController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, checkRole("admin"), getAllUsers)
  .post(authenticateUser, checkRole("admin"), createUser);
router
  .route("/:id")
  .delete(authenticateUser, checkRole("admin"), deleteUser);

router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .patch(authenticateUser, updateUserProfile);

export default router;
