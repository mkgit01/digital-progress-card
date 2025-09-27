import express from "express";
import {
  addProgress,
  getTaskProgress,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.post("/:taskId/progress", addProgress);
router.get("/:taskId/progress", getTaskProgress);
router.put("/:taskId/progress/:progressId", updateProgress);
router.delete("/:taskId/progress/:progressId", deleteProgress);

export default router;
