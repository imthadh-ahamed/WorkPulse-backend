import express from "express";
import validateTask from "../../middleware/validations/Task.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../controllers/Task/TaskController.js";

const router = express.Router();

router.post("/", validateTask, authenticate, authorizeAdmin, createTask);
router.get("/", authenticate, getTasks);
router.put("/:id", validateTask, authenticate, updateTask);
router.delete("/:id", authenticate, authorizeAdmin, deleteTask);

export default router;
