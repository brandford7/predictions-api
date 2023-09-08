import express from "express";

const router = express.Router();

router.route("/").get(getAlUsers).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUserDetails);
router.route('/profile').get(getUserProfile).put(updateUserProfile)

export default router;
