import { body, validationResult } from "express-validator";

const validateEmployee = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 50 })
    .withMessage("First name must not exceed 50 characters"),

  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 50 })
    .withMessage("Last name must not exceed 50 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ max: 250 })
    .withMessage("Email must not exceed 250 characters"),

  body("jobtitle")
    .optional()
    .isString()
    .withMessage("Job title must be a string")
    .isLength({ max: 50 })
    .withMessage("Job title must not exceed 50 characters"),

  body("department")
    .optional()
    .isString()
    .withMessage("Department must be a string")
    .isLength({ max: 50 })
    .withMessage("Department must not exceed 50 characters"),

  body("bio")
    .optional()
    .isString()
    .withMessage("Bio must be a string")
    .isLength({ max: 500 })
    .withMessage("Bio must not exceed 500 characters"),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string")
    .isLength({ max: 250 })
    .withMessage("Address must not exceed 250 characters"),
    
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];

export default validateEmployee;
