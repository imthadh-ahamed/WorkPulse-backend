import express from "express";
import {
  createFocusMode,
  getFocusModes,
  getFocusModeById,
  updateFocusMode,
  deleteFocusMode,
} from "../../controllers/FocusMode/focusModeController.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import validateFocusMode from "../../middleware/validations/FocusMode.js";

const router = express.Router();

// Create a new focus mode session
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  validateFocusMode,
  createFocusMode
);

// Get all focus mode sessions
router.get("/", authenticate, getFocusModes);

// Get a focus mode session by ID
router.get("/:id", authenticate, getFocusModeById);

// Update a focus mode session
router.put(
  "/:id",
  authenticate,
  authenticate,
  validateFocusMode,
  updateFocusMode
);

// Delete a focus mode session
router.delete("/:id", authenticate, authorizeAdmin, deleteFocusMode);

export default router;
