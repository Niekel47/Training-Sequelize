import { Router } from "express";
const router = Router();
import UserController from "./user.controller.js";

//User
router.get("/", UserController.getAllUsers);
// router.get("/", UserController.list);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// router.delete("/", deleteUsers);

export default router;
