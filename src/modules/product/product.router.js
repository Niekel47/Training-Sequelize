import { Router } from "express";
const router = Router();
import ProductController from "./product.controller.js";

//Product
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);
router.post("/delete-many", ProductController.deleteManyProduct);

export default router;
