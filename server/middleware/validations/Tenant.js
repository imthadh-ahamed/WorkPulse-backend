import { body, validationResult } from "express-validator";
import Tenant from "../../models/Tenant/Tenant.js";
import Employee from "../../models/Employees/Employee.js";

const validateCreateOrganization = [
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ max: 50 })
    .withMessage("Company name must not exceed 50 characters")
    .custom(async (value) => {
      const tenantExists = await Tenant.findOne({
        where: { companyName: value },
      });
      if (tenantExists) {
        throw new Error("Company name must be unique in the Tenant table");
      }
    }),
  body("email")
    .isEmail()
    .isLength({ max: 250 })
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const employeeExists = await Employee.findOne({
        where: { email: value },
      });
      if (employeeExists) {
        throw new Error("Owner email must be unique in the employee table");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  body("address")
    .optional()
    .isLength({ max: 250 })
    .withMessage("Address must not exceed 250 characters"),
  body("city")
    .optional()
    .isLength({ max: 100 })
    .withMessage("City must not exceed 100 characters"),
  body("state")
    .optional()
    .isLength({ max: 100 })
    .withMessage("State must not exceed 100 characters"),
  body("country")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Country must not exceed 100 characters"),
  body("postalCode")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Postal code must not exceed 20 characters"),
  body("industry")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Industry must not exceed 100 characters"),
  body("websiteUrl")
    .optional()
    .isLength({ max: 250 })
    .withMessage("Website URL must not exceed 250 characters")
    .isURL()
    .withMessage("Invalid URL format"),
  body("status")
    .optional()
    .isIn(["active", "inactive", "suspended"])
    .withMessage(
      "Status must be one of the following: active, inactive, suspended"
    ),
];

const validateInviteEmployee = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 250 })
    .withMessage("Email must not exceed 250 characters")
    .custom(async (value) => {
      const employeeExists = await Employee.findOne({
        where: { email: value },
      });
      if (employeeExists) {
        throw new Error("Email must be unique in the employee table");
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateCreateOrganization, validateInviteEmployee };
