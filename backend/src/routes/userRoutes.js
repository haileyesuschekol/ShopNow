import express from "express"
const router = express.Router()
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js"
import { protect, admin } from "../middleware/Auth.js"

router.route("/").post(registerUser).get(protect, admin, getUsers)
router.post("/login", authUser)
router.post("/logout", logoutUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
