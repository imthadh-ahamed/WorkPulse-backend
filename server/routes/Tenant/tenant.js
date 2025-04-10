import express from "express";
import tenantController from "../../controllers/Tenant/tenantController.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import {
  validateCreateOrganization,
  validateInviteEmployee,
} from "../../middleware/validations/Tenant.js";

const router = express.Router();

router.post(
  "/",
  validateCreateOrganization,
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
