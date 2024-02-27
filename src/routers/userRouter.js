import { Router } from "express";
const router = Router();
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,

  // logoutUser,
} from "../controllers/UserController.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

// router.post("/logout", logoutUser);

export default router;
