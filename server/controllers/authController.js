import bcrypt from "bcrypt";
import Employee from "../models/Employees/Employee.js";
import { createEmployee, deleteTempEmployee, generateAuthToken, getEmployeeByEmail, getTempEmployeeById } from "../services/Employees/userService.js";
import mongoose from "mongoose";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateAuthToken(employee);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, invitationToken, password } = req.body;

    // Find the employee by email and token
    const employee = await getTempEmployeeById({
      email,
      invitationToken,
    });
    if (!employee) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    
    // Create an employee record
    if (email !== employee.email) {
      return res
      .status(400)
      .json({ error: "Email does not match the invitation" });
    }
    
    const pastemployee = await getEmployeeByEmail(email);

    // Check if the email already exists in the employee collection
    if (pastemployee) {
      return res.status(400).json({ error: "This email already exists" });
    }

    await createEmployee(
      {
        tenantId: employee.tenantId,
        firstName,
        lastName,
        email,
        password,
        isAdmin: employee.role === "Admin",
        role: employee.role,
        created: new Date(),
        createdBy: employee.createdBy,
      },
      { session }
    );

    //Delete temp employee
    await deleteTempEmployee({ email, invitationToken });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  login,
  signup,
  getCurrentUser,
};
