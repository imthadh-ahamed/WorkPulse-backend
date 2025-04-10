import express from "express";
import validateAnnouncement from "../../middleware/validations/Announcement.js";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  getLatestAnnouncements,
  updateAnnouncement,
} from "../../controllers/Announcement/announcementController.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  validateAnnouncement,
  authenticate,
  authorizeAdmin,
  createAnnouncement
);
router.get("/", authenticate, getAnnouncements);
router.put(
  "/:id",
  validateAnnouncement,
  authenticate,
  authorizeAdmin,
  updateAnnouncement
);
router.delete("/:id", authenticate, authorizeAdmin, deleteAnnouncement);
router.get("/latest", authenticate, getLatestAnnouncements);

export default router;
