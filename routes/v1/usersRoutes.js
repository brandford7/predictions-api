import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../../controllers/usersController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/").get(authenticateUser, checkRole("admin"), getAllUsers);
router.route("/:id").delete(deleteUser);
router
  .route("/profile")
  .get(authenticateUser, getUserProfile)
  .put(authenticateUser, updateUserProfile);

export default router;
