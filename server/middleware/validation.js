import { body, validationResult } from "express-validator";

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
];

const validateInviteEmployee = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const employeeExists = await Employee.findOne({
        where: { email: value },
      });
      if (employeeExists) {
        throw new Error("Email must be unique in the employee table");
      }
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 100 })
    .withMessage("First name must not exceed 100 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 100 })
    .withMessage("Last name must not exceed 100 characters"),
];

export { validateCreateOrganization, validateInviteEmployee };
