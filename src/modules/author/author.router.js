import { Router } from "express";
const router = Router();
import AuthorController from "./author.controller.js";

router.post("/", AuthorController.createAuthor);
router.get("/", AuthorController.getAllAuthor);
router.put("/:id", AuthorController.updateAuthor);
router.delete("/:id", AuthorController.deleteAuthor);
router.post("/delete-many", AuthorController.deleteManyAuthor);

export default router;
