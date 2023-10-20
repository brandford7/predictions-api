import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUserDetails,
  createUser,
  getUserById,
} from "../../controllers/usersController.js";
import { authenticateUser, checkRole } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, checkRole("admin"), getAllUsers)
  .post(authenticateUser, checkRole("admin"), createUser);
router
  .route("/:id")
  .delete(authenticateUser, checkRole("admin"), deleteUser)
  .get(authenticateUser, checkRole("admin"), getUserById)
  .patch(authenticateUser, checkRole("admin"), updateUserDetails);

export default router;
