import { body, validationResult } from "express-validator";

const projectValidationRules = [
  body("tenantId").notEmpty().withMessage("Tenant ID is required"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must not exceed 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 250 })
    .withMessage("Description must not exceed 250 characters"),
  body("createdBy").notEmpty().withMessage("Created By is required"),
  body("displayName")
    .notEmpty()
    .withMessage("Display Name is required")
    .isLength({ max: 50 })
    .withMessage("Display Name must not exceed 50 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default projectValidationRules;
