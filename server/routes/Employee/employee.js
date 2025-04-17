import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
} from "../../controllers/Employee/employeeController.js";
import { authenticate, authorizeAdmin } from "../../middleware/auth.js";
import validateEmployee from "../../middleware/validations/Employee.js";

const router = express.Router();

router.get("/", authenticate, getAllEmployees);
router.get("/:id", authenticate, getEmployeeById);
router.delete("/:id", authenticate, authorizeAdmin, deleteEmployeeById);
router.put("/:id", validateEmployee, authenticate, authorizeAdmin, updateEmployeeById);

export default router;
