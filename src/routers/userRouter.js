import { Router } from "express";
const router = Router();


import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "./controllers/userController";

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
