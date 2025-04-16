import { body, validationResult } from "express-validator";

const validateTask = [
    body("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title must not exceed 100 characters"),
    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    body("assignedTo")
        .notEmpty()
        .withMessage("AssignedTo is required"),
    body("priority")
        .notEmpty()
        .withMessage("Priority is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export default validateTask;