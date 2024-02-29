import { Router } from "express";
import AuthController from "./auth.controller.js";
import validationHandler from "../../middleware/validator.middleware.js";
import {
  AuthLoginInput,
  AuthRegisterInput,
  AuthChangePassInput,
} from "./auth.validate.js";
const router = Router();

//auth
router.post(
  "/login",
  validationHandler(AuthLoginInput),
  AuthController.loginUser
);
router.post(
  "/register",
  validationHandler(AuthRegisterInput),
  AuthController.createUser
);
router.get("/profile/:id", AuthController.profile);
router.put("/profile/:id", AuthController.updateprofile);
// router.post("/profile/password/:id", AuthController.updatePassword);

// forgot pass
router.post(
  "/profile/password/:id",
  validationHandler(AuthChangePassInput),
  AuthController.updatePassword
);

//register

export default router;
