import { Router } from "express";
const router = Router();
import PublisherController from "./publisher.controller.js";

router.post("/", PublisherController.createPublisher);
router.get("/", PublisherController.getAllPublisher);
router.put("/:id", PublisherController.updatePublisher);
router.delete("/:id", PublisherController.deletePublisher);
router.post("/delete-many", PublisherController.deleteManyPublisher);

export default router;
