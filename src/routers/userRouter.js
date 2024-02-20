import { Router } from "express";
const router = Router();
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router.get("/", getAllUsers);
// router.get("/user/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
