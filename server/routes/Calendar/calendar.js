import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getUpcomingEvents,
  updateEvent,
} from "../../controllers/Calendar/calenderController.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import validateEvent from "../../middleware/validations/Event.js";

const router = express.Router();

router.post("/", validateEvent, authenticate, authorizeAdmin, createEvent);
router.get("/", authenticate, getEvents);
router.get("/latest", authenticate, getUpcomingEvents);
router.get("/:id", authenticate, getEventById);
router.put("/:id", validateEvent, authenticate, authorizeAdmin, updateEvent);
router.delete("/:id", authenticate, authorizeAdmin, deleteEvent);

export default router;
