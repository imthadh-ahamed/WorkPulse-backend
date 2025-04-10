import { body, validationResult } from "express-validator";

const validateEvent = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("start").notEmpty().withMessage("Start date is required"),
  body("end")
    .notEmpty()
    .withMessage("End date is required")
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.body.start)) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
  body("location")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Location must not exceed 100 characters"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["meeting", "event", "deadline"])
    .withMessage("Type must be one of the following: meeting, event, deadline"),
  body("repeat")
    .optional()
    .isIn(["once", "daily", "weekly", "monthly", "yearly"])
    .withMessage(
      "Repeat must be one of the following: once, daily, weekly, monthly, yearly"
    ),
  body("repeatEndDate").optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateEvent;
