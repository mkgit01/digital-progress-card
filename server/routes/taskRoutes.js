import express from "express";
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);

export default router;
