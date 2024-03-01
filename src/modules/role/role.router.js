import { Router } from "express";
import validationHandler from "../../middleware/validator.middleware.js";
import { AccessTokenGuard } from "../../middleware/auth.middleware.js";
import { RoleInput } from "./rolde.validate.js";
import RoleController from "./role.controller.js";

const router = Router();
router.post("/", validationHandler(RoleInput), RoleController.create);
router.get("/", AccessTokenGuard(["admin"]), RoleController.list);
router.get(
  "/permissions",
  AccessTokenGuard(["admin"]),
  RoleController.listPermission
);
router.delete("/", AccessTokenGuard(["admin"]), RoleController.delete);
router.put(
  "/:id",
  AccessTokenGuard(["admin"]),
  validationHandler(RoleInput),
  RoleController.update
);

export default router;
