import { body } from "express-validator";

export const RoleInput = [
  body("name").notEmpty().withMessage("Role name is required"),
  body("permissions").notEmpty().withMessage("Permissions is required"),
];
