import { Router } from "express";
const router = Router();
import CategoryController from "./category.controller.js";

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);
router.post("/delete-many", CategoryController.deleteManyCategory);

export default router;
