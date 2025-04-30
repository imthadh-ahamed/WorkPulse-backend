import express from "express";
import projectValidationRules from "../../middleware/validations/Project.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../../controllers/Project/ProjectController.js";

const router = express.Router();

// Create a new project
router.post(
  "/",
  projectValidationRules,
  authenticate,
  authorizeAdmin,
  createProject
);

// Get all projects
router.get("/", authenticate, getAllProjects);

// Get a project by ID
router.get("/:id", authenticate, getProjectById);

// Update a project
router.put(
  "/:id",
  projectValidationRules,
  authenticate,
  authorizeAdmin,
  updateProject
);

// Delete a project
router.delete("/:id", authenticate, authorizeAdmin, deleteProject);

export default router;
