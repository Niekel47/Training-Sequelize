import { Router } from "express";
const router = Router();
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "./user.controller.js";

//User
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
