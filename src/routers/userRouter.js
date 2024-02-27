import { Router } from "express";
const router = Router();
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
} from "../controllers/UserController.js";


router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
