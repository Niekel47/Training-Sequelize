import { Router } from "express";
import AuthController from "./auth.controller.js";
const router = Router();

//auth
router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.createUser);

// forgot pass

//register

export default router;
