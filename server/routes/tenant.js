import express from "express";
import tenantController from "../controllers/tenantController.js";
import {
  validateCreateOrganization,
  validateInviteEmployee,
} from "../middleware/validation.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  //   validateCreateOrganization,
  tenantController.createOrganization
);

router.post(
  "/invite-employee",
  authenticate,
  authorizeAdmin,
  validateInviteEmployee,
  tenantController.inviteEmployee
);

export default router;
