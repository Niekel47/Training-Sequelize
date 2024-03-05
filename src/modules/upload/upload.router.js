import express from "express";
import { uploadImageController } from "./upload.controller.js";
import { upload } from "./upload.service.js";

const router = express.Router();

// Định nghĩa route để xử lý việc upload ảnh
router.post("/", upload.single("file"), uploadImageController);

export default router;
