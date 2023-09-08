import express from "express";
import { deleteUser, getAllUsers, getUserById, getUserProfile, updateUser, updateUserProfile } from "../../controllers/usersController.js";

const router = express.Router();

router.route("/").get(getAllUsers)
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile)

export default router;
